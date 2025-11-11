// SIDEBAR NAVIGATION
const icons = document.querySelectorAll('.sidebar .icon');
const tabs = document.querySelectorAll('.tab-content');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        icons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');

        tabs.forEach(tab => tab.classList.remove('active'));

        const targetId = icon.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// SEARCH BAR FILTER (Dashboard)
const searchBar = document.getElementById('searchBar');
if (searchBar) {
    searchBar.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('#productList .product-card').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            card.parentElement.style.display = name.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// CATEGORY FILTER (Dashboard)
const categoryButtons = document.querySelectorAll('#dashboard .category-btn');
const products = document.querySelectorAll('#dashboard .product-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.textContent.trim();

        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (category === 'All' || productCategory === category) {
                product.parentElement.style.display = 'block';
            } else {
                product.parentElement.style.display = 'none';
            }
        });
    });
});

// Initialize global app object
window.app = window.app || {};

// Re-run table loads when switching tabs to ensure data is fresh
const tabIcons = document.querySelectorAll('.sidebar .icon');
tabIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const targetId = icon.getAttribute('data-target');
        if (targetId === 'orders') {
            if (window.app.orderController) {
                window.app.orderController.load_customer_select();
                window.app.orderController.update_cart_display();
            }
        } else if (targetId === 'reports') {
            if (window.app.orderController) {
                window.app.orderController.load_order_history_tbl();
            }
        }
    });
});