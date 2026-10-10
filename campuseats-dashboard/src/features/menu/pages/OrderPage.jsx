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
            validationErrors.qty = "Qty must be >= 1";
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
                <h2>🎉 Order Successful!</h2>
                <p>Thanks, <strong>{form.name}</strong>! Your order has been received.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: "20px"}}>
                    <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>Full Name</label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div style={{marginBottom: "20px"}}>
                    <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>Email Address</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>

                <div style={{marginBottom: "30px"}}>
                    <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>Number of Items</label>
                    <input
                        name="qty"
                        type="number"
                        value={form.qty}
                        onChange={handleChange}
                        placeholder="1"
                        min="1"
                    />
                    {errors.qty && <span>{errors.qty}</span>}
                </div>

                <button type="submit" style={{width: "100%", padding: "14px", fontSize: "16px"}}>
                    Complete Order
                </button>
            </form>
        </div>
    );
}

export default OrderPage;