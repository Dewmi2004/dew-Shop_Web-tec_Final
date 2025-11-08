import { item_db } from "../db/DB.js";

//=======================ADD ITEM=========================
export const add_item = (item) => item_db.push(item);

//=====================DELETE ITEM=======================
export const delete_item = (index) => item_db.splice(index, 1);

//=======================GET ALL ITEMS===================
export const get_items = () => item_db;

//=======================GET SINGLE ITEM================
export const get_item = (index) => item_db[index];

//=====================UPDATE ITEM=======================
export const update_item = (index, item) => item_db[index] = item;
