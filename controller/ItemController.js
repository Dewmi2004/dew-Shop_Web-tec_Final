import ItemDTO from "../dto/ItemDTO.js";
import {
    add_item,
    update_item,
    delete_item,
    get_items,
    get_item
} from "../model/ItemModel.js";

$(document).ready(() => {

    let selectedIndex = -1;

    //================ LOAD ITEM TABLE =================//
    const load_item_tbl = () => {
        $("#itemTableBody").empty();
        const item_list = get_items();

        item_list.forEach((obj, index) => {
            const stockQty = Number(obj.stockQty);
            const reorderLevel = Number(obj.reorderLevel);

            const status = stockQty === 0 ? "❌ Out of Stock" :
                stockQty <= reorderLevel ? "⚠️ Low Stock" : "✅ In Stock";

            const tbl_row = `
                <tr data-index="${index}">
                    <td>${obj.code}</td>
                    <td>${obj.name}</td>
                    <td>${obj.category}</td>
                    <td>${obj.unitPrice}</td>
                    <td>${obj.stockQty}</td>
                    <td>${obj.reorderLevel}</td>
                    <td>${obj.supplier}</td>
                    <td>${status}</td>
                </tr>`;
            $("#itemTableBody").append(tbl_row);
        });
    };

    //================ CLEAR FORM =================//
    const reset_form = () => {
        $("#itemCode").val("");
        $("#itemName").val("");
        $("#itemCategory").val("Select category");
        $("#unitPrice").val("");
        $("#stockQty").val("");
        $("#reorderLevel").val("");
        $("#supplier").val("");
        selectedIndex = -1;
    };

    //================ VALIDATE FIELDS =================//
    const validate_fields = () => {
        const code = $("#itemCode").val() ? $("#itemCode").val().trim() : "";
        const name = $("#itemName").val() ? $("#itemName").val().trim() : "";
        const category = $("#itemCategory").val();
        const unitPrice = $("#unitPrice").val() ? $("#unitPrice").val().trim() : "";
        const stockQty = $("#stockQty").val() ? $("#stockQty").val().trim() : "";
        const reorderLevel = $("#reorderLevel").val() ? $("#reorderLevel").val().trim() : "";
        const supplier = $("#supplier").val() ? $("#supplier").val().trim() : "";

        if (!code || !name || category === "Select category" || !unitPrice || !stockQty || !reorderLevel || !supplier) {
            Swal.fire("Warning!", "All fields are required!", "warning");
            return false;
        }

        if (isNaN(unitPrice) || isNaN(stockQty) || isNaN(reorderLevel)) {
            Swal.fire("Warning!", "Unit Price, Stock Quantity, and Reorder Level must be numbers!", "warning");
            return false;
        }
        return true;
    };

    //================ ADD ITEM =================//
    $("#item_save_btn").on("click", function (e) {
        e.preventDefault();
        if (!validate_fields()) return;

        const item_obj = new ItemDTO(
            $("#itemCode").val().trim(),
            $("#itemName").val().trim(),
            $("#itemCategory").val(),
            parseFloat($("#unitPrice").val().trim()),
            parseInt($("#stockQty").val().trim()),
            parseInt($("#reorderLevel").val().trim()),
            $("#supplier").val().trim()
        );

        add_item(item_obj);
        load_item_tbl();
        reset_form();

        Swal.fire({
            icon: "success",
            title: "Item Added!",
            text: "New item has been successfully added.",
            timer: 1500,
            showConfirmButton: false
        });
    });

    //================ SELECT ITEM ROW =================//
    $("#itemTableBody").on("click", "tr", function () {
        selectedIndex = $(this).data("index");
        const item_detail = get_item(selectedIndex);

        $("#itemCode").val(item_detail.code);
        $("#itemName").val(item_detail.name);
        $("#itemCategory").val(item_detail.category);
        $("#unitPrice").val(item_detail.unitPrice);
        $("#stockQty").val(item_detail.stockQty);
        $("#reorderLevel").val(item_detail.reorderLevel);
        $("#supplier").val(item_detail.supplier);
    });

    //================ DELETE ITEM =================//
    $("#item_delete_btn").on("click", () => {
        if (selectedIndex === -1) {
            Swal.fire("Error!", "Please select an item to delete.", "error");
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
                delete_item(selectedIndex);
                load_item_tbl();
                reset_form();
                Swal.fire("Deleted!", "Item has been removed.", "success");
            }
        });
    });

    //================ UPDATE ITEM =================//
    $("#item_update_btn").on("click", function () {
        if (selectedIndex === -1) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Please select an item to update." });
            return;
        }

        if (!validate_fields()) return;

        const updated_item = new ItemDTO(
            $("#itemCode").val().trim(),
            $("#itemName").val().trim(),
            $("#itemCategory").val(),
            parseFloat($("#unitPrice").val().trim()),
            parseInt($("#stockQty").val().trim()),
            parseInt($("#reorderLevel").val().trim()),
            $("#supplier").val().trim()
        );

        update_item(selectedIndex, updated_item);
        load_item_tbl();
        reset_form();

        Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Item details have been updated successfully.",
            timer: 1500,
            showConfirmButton: false
        });
    });

    //================ INITIAL LOAD =================//
    load_item_tbl();

});
