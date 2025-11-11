class CustomerDTO{
    constructor(c_id,f_name ,l_name,email,phone,dob,city,gender) {
        this._c_id = c_id;
        this._f_name = f_name;
        this._l_name = l_name;
        this._email =email;
        this._phone = phone;
        this._dob =dob;
        this._city = city;
        this._gender = gender;
    }

    get c_id() {
        return this._c_id;
    }

    set c_id(c_id) {
        this._c_id = c_id;
    }

    get f_name() {
        return this._f_name;
    }

    set f_name(f_name) {
        this._f_name = f_name;
    }

    get l_name() {
        return this._l_name;
    }

    set l_name(l_name) {
        this._l_name = l_name;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        this._phone = phone;
    }

    get dob() {
        return this._dob;
    }

    set dob(dob) {
        this._dob = dob;
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }
}
export default CustomerDTO;