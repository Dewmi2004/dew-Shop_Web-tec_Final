import {customer_db} from "../db/DB.js";

//=======================ADD CUSTOMER=========================
export const add_customer = (customer) => customer_db.push(customer);

//=====================DELETE CUSTOMER========================
export const delete_customer = (index) => customer_db.splice(index, 1);

//=======================GET ALL CUSTOMER====================
export const get_customers = () => customer_db;

//=======================GET SINGLE CUSTOMER==================
export const get_customer = (index) => customer_db[index];

//=====================UPDATE CUSTOMER========================
export const update_customer = (index, customer) => customer_db[index] = customer;






