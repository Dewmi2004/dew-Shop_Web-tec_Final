// Database arrays
export const customer_db = [];
export const item_db = [];
export const order_db = [];
export const cart_db = [];

// For backward compatibility with existing code
const db = {
    customers: customer_db,
    items: item_db,
    orders: order_db,
    cart: cart_db
};

window.db = db;