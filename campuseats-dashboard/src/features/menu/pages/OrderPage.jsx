import { useState } from "react";

function OrderPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        qty: ""
    });

    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    function validate(values) {
        const validationErrors = {};

        if (values.name.trim().length < 2) {
            validationErrors.name = "Name too short";
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
            validationErrors.email = "Enter a valid email";
        }
        if (Number(values.qty) < 1) {
            validationErrors.qty = "Qty must be ≥ 1";
        }
        return validationErrors;
    }

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const foundErrors = validate(form);
        setErrors(foundErrors);

        if (Object.keys(foundErrors).length === 0) {
            setDone(true);
        }
    }

    if (done) {
        return (
            <div className="success-message">
                <h2>Order Successful!</h2>
                <p>Thanks, {form.name}! Your order has been received.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
            />

            {errors.name && (
                <span>{errors.name}</span>
            )}

            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
            />

            {errors.email && (
                <span>{errors.email}</span>
            )}

            <input
                name="qty"
                type="number"
                value={form.qty}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="1"
            />

            {errors.qty && (
                <span>{errors.qty}</span>
            )}

            <button type="submit">
                Place order
            </button>
        </form>
    );
}

export default OrderPage;