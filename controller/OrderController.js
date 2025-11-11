import CartItemDTO from "../dto/CartItemDTO.js";
import { get_items } from "../model/ItemModel.js";
import { get_customers } from "../model/CustomerModel.js";
import {
    get_cart_items,
    add_to_cart,
    update_cart_item_quantity,
    remove_from_cart,
    clear_cart,
    place_order,
    get_orders
} from "../model/OrderModel.js";
import { order_db, cart_db } from "../db/DB.js";
const TAX_RATE = 0.08;

const orderController = (() => {

    //================ UI Helpers =================//

    // Load available items to the POS Menu Grid
    const load_menu_grid = (category = 'All') => {
        const menuGrid = $("#menuGrid");
        menuGrid.empty();
        const items = get_items();

        items.forEach(item => {
            if (category === 'All' || item.category === category) {
                const stockQty = item.stockQty;
                const isOutOfStock = stockQty === 0;

                const card = `
                    <div class="col-md-4 col-sm-6 mb-4 menu-item" data-category="${item.category}" data-code="${item.code}">
                        <div class="card product-card text-center p-3 ${isOutOfStock ? 'opacity-50' : ''}">
                            <div class="fs-1 mb-2">🏷</div>
                            <h5>${item.name}</h5>
                            <p class="product-price">Rs. ${item.unitPrice.toFixed(2)}</p>
                            <p class="text-muted small mb-1">Stock: ${stockQty}</p>
                            <button class="btn btn-sm btn-accent add-to-cart-btn" data-code="${item.code}" ${isOutOfStock ? 'disabled' : ''}>
                                ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>`;
                menuGrid.append(card);
            }
        });
    };

    // Load customers to the Customer Select dropdown
    const load_customer_select = () => {
        const customerSelect = $("#customerSelect");
        customerSelect.empty();
        customerSelect.append('<option value="">Walk-in Customer</option>');

        get_customers().forEach(customer => {
            customerSelect.append(`<option value="${customer.c_id}">${customer.c_id} - ${customer.f_name} ${customer.l_name}</option>`);
        });
    };

    // Load the cart items into the offcanvas panel and update totals
    const update_cart_display = () => {
        const cartItemsContainer = $("#cartItems");
        cartItemsContainer.empty();
        const cartItems = get_cart_items();
        let subtotal = 0;

        if (cartItems.length === 0) {
            cartItemsContainer.html('<p class="text-muted">Your cart is empty.</p>');
            $("#placeOrderBtn").prop('disabled', true);
        } else {
            $("#placeOrderBtn").prop('disabled', false);

            cartItems.forEach((item, index) => {
                const itemTotal = item.unitPrice * item.quantity;
                subtotal += itemTotal;

                const div = `
                    <div class="cart-item mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <div class="name fw-bold">${item.name} (${item.code})</div>
                                <div class="price">Rs. ${item.unitPrice.toFixed(2)} x ${item.quantity}</div>
                                <div class="mt-1">
                                    <button class="btn btn-sm btn-accent cart-qty-btn" data-index="${index}" data-change="-1">-</button>
                                    <span class="qty px-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-accent cart-qty-btn" data-index="${index}" data-change="1">+</button>
                                </div>
                            </div>
                            <button class="btn btn-danger btn-sm remove-cart-item" data-index="${index}">×</button>
                        </div>
                    </div>`;
                cartItemsContainer.append(div);
            });
        }

        // Calculate Totals
        const discountPercent = parseFloat($("#discountPercent").val()) / 100 || 0;
        const totalDiscount = subtotal * discountPercent;
        const discountedSubtotal = subtotal - totalDiscount;
        const totalTax = discountedSubtotal * TAX_RATE;
        const orderTotal = discountedSubtotal + totalTax;

        // Update Summary Panel
        $("#subtotal").text(`LKR ${subtotal.toFixed(2)}`);
        $("#taxAmount").text(`LKR ${totalTax.toFixed(2)}`);
        $("#orderTotal").text(`LKR ${orderTotal.toFixed(2)}`);
        $("#totalValue").text(`LKR ${orderTotal.toFixed(2)}`); // Offcanvas cart total

        // Update Total Revenue Stat (placeholder for today's revenue)
        let totalRevenueStat = 0;
        get_orders().forEach(order => {
            if (order.date === new Date().toISOString().split('T')[0]) {
                totalRevenueStat += order.totalCost;
            }
        });
        $("#totalRevenueStat").text(`LKR ${totalRevenueStat.toFixed(2)}`);

        load_menu_grid($("#categoryFilters .category-btn.active").text());
    };

    // Load orders into the Reports tab table
    const load_order_history_tbl = () => {
        const historyTable = $("#historyTable");
        historyTable.empty();
        const orders = get_orders().reverse(); // Fetches all orders from order_db

        orders.forEach(order => {

            const customerDisplay = order.customerId || "Walk-in";
            const itemsSummary = order.items.map(i => `${i.name} (${i.quantity})`).join(', ');

            const tbl_row = `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.date} ${order.time}</td>
                    <td>${customerDisplay}</td>
                    <td title="${itemsSummary}">${order.items.length} item(s)</td>
                    <td>LKR ${order.totalCost.toFixed(2)}</td>
                    <td>LKR ${order.totalDiscount.toFixed(2)}</td>
                    <td><span class="badge-status badge-completed">Completed</span></td>
                    <td><button class="btn btn-sm btn-primary view-order-details" data-id="${order.orderId}">View</button></td>
                </tr>`;
            historyTable.append(tbl_row);
        });
    };

    //================ Event Handlers =================//

    // Add to Cart button
    $("#menuGrid").on("click", ".add-to-cart-btn", function () {
        const itemCode = $(this).data("code");
        const itemModel = get_items().find(i => i.code === itemCode);

        if (!itemModel || itemModel.stockQty < 1) {
            Swal.fire("Error!", "Item is out of stock!", "error");
            return;
        }

        const cartItem = new CartItemDTO(itemModel.code, itemModel.name, itemModel.unitPrice, 1);
        add_to_cart(cartItem);
        update_cart_display();

        Swal.fire({
            icon: "success",
            title: "Added to Cart!",
            text: `${itemModel.name} added to the current order.`,
            timer: 800,
            showConfirmButton: false,
            position: 'bottom-end',
            toast: true
        });
    });

    // Cart quantity +/- buttons
    $("#cartItems").on("click", ".cart-qty-btn", function () {
        const index = $(this).data("index");
        const change = $(this).data("change");
        const cartItem = get_cart_items()[index];
        if (!cartItem) return;

        const itemModel = get_items().find(i => i.code === cartItem.code);

        if (change > 0 && cartItem.quantity + change > itemModel.stockQty) {
            Swal.fire("Warning!", `Maximum stock for ${cartItem.name} reached (${itemModel.stockQty}).`, "warning");
            return;
        }

        const newQuantity = cartItem.quantity + change;
        update_cart_item_quantity(index, newQuantity);
        update_cart_display();
    });

    // Remove item from cart
    $("#cartItems").on("click", ".remove-cart-item", function () {
        const index = $(this).data("index");
        remove_from_cart(index);
        update_cart_display();
    });

    // Place Order
    const handle_place_order = () => {
        if (get_cart_items().length === 0) {
            Swal.fire("Error!", "The cart is empty. Please add items to place an order.", "error");
            return;
        }

        const customerId = $("#customerSelect").val() || null;
        const total = parseFloat($("#orderTotal").text().replace('LKR ', ''));
        const discount = parseFloat($("#subtotal").text().replace('LKR ', '')) * (parseFloat($("#discountPercent").val()) / 100 || 0);
        const tax = parseFloat($("#taxAmount").text().replace('LKR ', ''));

        const insufficientStock = get_cart_items().filter(cartItem => {
            const itemModel = get_items().find(i => i.code === cartItem.code);
            return !itemModel || itemModel.stockQty < cartItem.quantity;
        });

        if (insufficientStock.length > 0) {
            const itemNames = insufficientStock.map(i => i.name).join(', ');
            Swal.fire("Error!", `Stock insufficient for: ${itemNames}. Please update quantities.`, "error");
            return;
        }

        const newOrder = place_order(customerId, total, discount, tax);

        if (newOrder) {
            Swal.fire({
                icon: "success",
                title: "Order Placed!",
                text: `Order ${newOrder.orderId} placed successfully.`,
                timer: 2000,
                showConfirmButton: false
            });
            update_cart_display();
            load_order_history_tbl();
        } else {
            Swal.fire("Error!", "Could not place order due to an unknown error.", "error");
        }
    };

    // Filter menu
    const filter_menu = (category) => {
        $("#categoryFilters .category-btn").removeClass('active');
        $(`#categoryFilters button:contains(${category})`).addClass('active');
        load_menu_grid(category === 'All' ? 'All' : category);
    };

    // Initial Load
    $(document).ready(() => {
        load_menu_grid('All');
        load_customer_select();
        update_cart_display();
        load_order_history_tbl();

        $("#placeOrderBtn").on("click", handle_place_order);
    });

    // Public methods
    return {
        load_menu_grid,
        update_cart_display,
        placeOrder: handle_place_order,
        filterMenu: filter_menu,
        load_customer_select,
        load_order_history_tbl
    };
})();

window.app = window.app || {};
window.app.orderController = orderController;
