import { order_db, cart_db } from "../db/DB.js";
import { get_items, deduct_stock } from "./ItemModel.js";
import OrderDTO from "../dto/OrderDTO.js";

export const get_cart_items = () => cart_db;

export const add_to_cart = (item) => {
    const existingIndex = cart_db.findIndex(cartItem => cartItem.code === item.code);
    if (existingIndex !== -1) {
        cart_db[existingIndex].quantity += item.quantity;
    } else {
        cart_db.push(item);
    }
};

export const update_cart_item_quantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
        cart_db.splice(index, 1);
    } else {
        cart_db[index].quantity = newQuantity;
    }
};

export const remove_from_cart = (index) => {
    cart_db.splice(index, 1);
};

export const clear_cart = () => {
    cart_db.length = 0; // same array reference stays intact
};

// Generate order ID
const generate_order_id = () => {
    const lastId = order_db.length > 0 ? order_db[order_db.length - 1].orderId : "ORD-000";
    const num = parseInt(lastId.split('-')[1]) + 1;
    return `ORD-${String(num).padStart(3, '0')}`;
};

// Place order
export const place_order = (customerId, totalCost, totalDiscount, totalTax) => {
    if (cart_db.length === 0) {
        console.warn("⚠️ Cart is empty in place_order()");
        return false;
    }

    // Check stock availability
    for (const item of cart_db) {
        const itemModel = get_items().find(i => i.code === item.code);
        if (!itemModel || itemModel.stockQty < item.quantity) {
            console.warn(`❌ Insufficient stock for ${item.code}`);
            return false;
        }
    }

    // Deduct stock
    for (const item of cart_db) {
        deduct_stock(item.code, item.quantity);
    }

    // Create order
    const now = new Date();
    const orderId = generate_order_id();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newOrder = new OrderDTO(
        orderId,
        customerId || "Walk-in",
        date,
        time,
        totalCost,
        totalDiscount,
        totalTax,
        [...cart_db]
    );

    // Add to DB
    order_db.push(newOrder);

    // Clear cart (same reference)
    clear_cart();

    return newOrder;
};

export const get_orders = () => order_db;
