class ItemDTO {
    constructor(code, name, category, unitPrice, stockQty, reorderLevel, supplier) {
        this._code = code;
        this._name = name;
        this._category = category;
        this._unitPrice = parseFloat(unitPrice);
        this._stockQty = parseInt(stockQty);
        this._reorderLevel = parseInt(reorderLevel);
        this._supplier = supplier;
    }

    get code() { return this._code; }
    set code(code) { this._code = code; }

    get name() { return this._name; }
    set name(name) { this._name = name; }

    get category() { return this._category; }
    set category(category) { this._category = category; }

    get unitPrice() { return this._unitPrice; }
    set unitPrice(unitPrice) { this._unitPrice = parseFloat(unitPrice); }

    get stockQty() { return this._stockQty; }
    set stockQty(stockQty) { this._stockQty = parseInt(stockQty); }

    get reorderLevel() { return this._reorderLevel; }
    set reorderLevel(reorderLevel) { this._reorderLevel = parseInt(reorderLevel); }

    get supplier() { return this._supplier; }
    set supplier(supplier) { this._supplier = supplier; }
}

export default ItemDTO;