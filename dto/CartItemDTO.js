class CartItemDTO {
    constructor(code, name, unitPrice, quantity) {
        this._code = code;
        this._name = name;
        this._unitPrice = parseFloat(unitPrice);
        this._quantity = parseInt(quantity);
    }

    get code() { return this._code; }
    set code(code) { this._code = code; }

    get name() { return this._name; }
    set name(name) { this._name = name; }

    get unitPrice() { return this._unitPrice; }
    set unitPrice(unitPrice) { this._unitPrice = parseFloat(unitPrice); }

    get quantity() { return this._quantity; }
    set quantity(quantity) { this._quantity = parseInt(quantity); }

    get total() { return this._unitPrice * this._quantity; }
}

export default CartItemDTO;