class OrderDTO {
    constructor(orderId, customerId, date, time, totalCost, totalDiscount, totalTax, items) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._date = date;
        this._time = time;
        this._totalCost = parseFloat(totalCost);
        this._totalDiscount = parseFloat(totalDiscount);
        this._totalTax = parseFloat(totalTax);
        this._items = items; // Array of CartItemDTOs
    }

    get orderId() { return this._orderId; }
    set orderId(orderId) { this._orderId = orderId; }

    get customerId() { return this._customerId; }
    set customerId(customerId) { this._customerId = customerId; }

    get date() { return this._date; }
    set date(date) { this._date = date; }

    get time() { return this._time; }
    set time(time) { this._time = time; }

    get totalCost() { return this._totalCost; }
    set totalCost(totalCost) { this._totalCost = parseFloat(totalCost); }

    get totalDiscount() { return this._totalDiscount; }
    set totalDiscount(totalDiscount) { this._totalDiscount = parseFloat(totalDiscount); }

    get totalTax() { return this._totalTax; }
    set totalTax(totalTax) { this._totalTax = parseFloat(totalTax); }

    get items() { return this._items; }
    set items(items) { this._items = items; }
}

export default OrderDTO;