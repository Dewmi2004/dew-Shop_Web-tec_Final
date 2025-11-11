import { item_db } from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

//==================== DEFAULT ITEMS ====================
if (item_db.length === 0) {
    item_db.push(
        new ItemDTO("ITM-001", "Silver Watch", "Watches", 4000, 25, 10, "Dew"),
        new ItemDTO("ITM-002", "Red Maxi", "Clothing", 3200, 30, 10, "Dew"),
        new ItemDTO("ITM-003", "Nike Air", "Shoes", 8500, 8, 10, "Dew"),
        new ItemDTO("ITM-004", "Leather Bag", "Accessories", 7200, 0, 10, "Dew")
    );
}

//=======================ADD ITEM=========================
export const add_item = (item) => item_db.push(item);

//=====================DELETE ITEM=======================
export const delete_item = (index) => item_db.splice(index, 1);

//=======================GET ALL ITEMS===================
export const get_items = () => item_db;

//=======================GET SINGLE ITEM=================
export const get_item = (index) => item_db[index];

//=====================UPDATE ITEM=======================
export const update_item = (index, item) => item_db[index] = item;

//==================== FOR ORDER SYSTEM ==================
// Get item by code (for orders)
export const get_item_by_code = (code) => item_db.find(item => item.code === code);

// Deduct stock quantity
export const deduct_stock = (code, quantity) => {
    const item = item_db.find(item => item.code === code);
    if (item && item.stockQty >= quantity) {
        item.stockQty -= quantity;
        return true;
    }
    return false;
};