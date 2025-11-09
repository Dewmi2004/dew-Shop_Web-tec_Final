class OrderDTO {
    constructor(orderId, customerName, orderDate, status, items,quantity, totalAmount, paymentMethod) {
        this._orderId = orderId;
        this._customerName = customerName;
        this._orderDate = orderDate;
        this._status = status;
        this._items = items;
        this._quantity = quantity;
        this._totalAmount = totalAmount;
        this._paymentMethod = paymentMethod;
    }

    // Order ID
    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    // Customer Name
    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    // Order Date
    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    // Items Array
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    // Total Amount
    get totalAmount() {
        return this._totalAmount;
    }

    set totalAmount(value) {
        this._totalAmount = parseFloat(value);
    }

    // Payment Method
    get paymentMethod() {
        return this._paymentMethod;
    }

    set paymentMethod(value) {
        this._paymentMethod = value;
    }

    // Status
    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}

export default OrderDTO;