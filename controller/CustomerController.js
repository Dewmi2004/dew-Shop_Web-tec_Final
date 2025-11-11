import CustomerDTO from "../dto/CustomerDTO.js";
import {
    add_customer,
    update_customer,
    delete_customer,
    get_customers,
    get_customer
} from "../model/CustomerModel.js";

let selectedIndex = -1;

//================ LOAD CUSTOMER TABLE =================//
const load_customer_tbl = () => {
    $("#customerTableBody").empty();
    const customer_list = get_customers();

    customer_list.forEach((obj, index) => {
        const tbl_row = `
            <tr data-index="${index}">
                <td>${obj.c_id}</td>
                <td>${obj.f_name}</td>
                <td>${obj.l_name}</td>
                <td>${obj.email}</td>
                <td>${obj.phone}</td>
                <td>${obj.dob}</td>
                <td>${obj.city}</td>
                <td>${obj.gender}</td>
            </tr>`;
        $("#customerTableBody").append(tbl_row);
    });
};

//================ CLEAR FORM =================//
const reset_form = () => {
    $("#customerId").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#dob").val("");
    $("#city").val("");
    $("input[name='gender']").prop("checked", false);
    selectedIndex = -1;
};

//================ VALIDATE FIELDS =================//
const validate_fields = () => {
    const c_id = $("#customerId").val().trim();
    const f_name = $("#firstName").val().trim();
    const l_name = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const dob = $("#dob").val().trim();
    const city = $("#city").val().trim();
    const gender = $("input[name='gender']:checked").val();

    if (!c_id || !f_name || !l_name || !email || !phone || !dob || !city || !gender) {
        Swal.fire("Warning!", "All fields are required!", "warning");
        return false;
    }
    return true;
};

//================ ADD CUSTOMER =================//
$("#customer_save_btn").on("click", function (e) {
    e.preventDefault();
    if (!validate_fields()) return;

    const c_id = $("#customerId").val();
    const f_name = $("#firstName").val();
    const l_name = $("#lastName").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const dob = $("#dob").val();
    const city = $("#city").val();
    const gender = $("input[name='gender']:checked").val();

    const customer_obj = new CustomerDTO(c_id, f_name, l_name, email, phone, dob, city, gender);
    add_customer(customer_obj);

    load_customer_tbl();
    reset_form();

    Swal.fire({
        icon: "success",
        title: "Customer Added!",
        text: "New Customer has been successfully added.",
        timer: 1500,
        showConfirmButton: false
    });
});

//================ SELECT CUSTOMER ROW =================//
$("#customerTableBody").on("click", "tr", function () {
    selectedIndex = $(this).data("index");
    const customer_detail = get_customer(selectedIndex);

    $("#customerId").val(customer_detail.c_id);
    $("#firstName").val(customer_detail.f_name);
    $("#lastName").val(customer_detail.l_name);
    $("#email").val(customer_detail.email);
    $("#phone").val(customer_detail.phone);
    $("#dob").val(customer_detail.dob);
    $("#city").val(customer_detail.city);
    $("input[name='gender'][value='" + customer_detail.gender + "']").prop("checked", true);
});

//================ DELETE CUSTOMER =================//
$("#customer_delete_btn").on("click", () => {
    if (selectedIndex === -1) {
        Swal.fire("Error!", "Please select a Customer to delete.", "error");
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            delete_customer(selectedIndex);
            load_customer_tbl();
            reset_form();

            Swal.fire("Deleted!", "Customer has been removed.", "success");
        }
    });
});

//================ UPDATE CUSTOMER =================//
$("#customer_update_btn").on("click", function () {
    if (selectedIndex === -1) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select a customer to update."
        });
        return;
    }

    if (!validate_fields()) return;

    const c_id = $("#customerId").val();
    const f_name = $("#firstName").val();
    const l_name = $("#lastName").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const dob = $("#dob").val();
    const city = $("#city").val();
    const gender = $("input[name='gender']:checked").val();

    const updated_customer = new CustomerDTO(c_id, f_name, l_name, email, phone, dob, city, gender);
    update_customer(selectedIndex, updated_customer);

    load_customer_tbl();
    reset_form();

    Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Customer details have been updated successfully.",
        timer: 1500,
        showConfirmButton: false
    });
});

//================ INITIAL LOAD =================//
$(document).ready(() => {
    load_customer_tbl();
});