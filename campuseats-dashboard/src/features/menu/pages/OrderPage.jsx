import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiMail, FiShoppingBag, FiCheckCircle, FiSend, FiList } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import CustomSelect from "../components/CustomSelect";

const AVAILABLE_DISHES = [
    { id: 1, name: "Kottu Roti", price: 750, category: "Mains" },
    { id: 2, name: "Fried Rice", price: 850, category: "Mains" },
    { id: 3, name: "Veg Sub", price: 600, category: "Snacks" },
    { id: 4, name: "Watalappan", price: 350, category: "Dessert" },
    { id: 5, name: "Iced Milo", price: 300, category: "Drinks" },
    { id: 6, name: "Chicken Burger", price: 650, category: "Snacks" },
    { id: 7, name: "Egg Roti", price: 200, category: "Snacks" },
    { id: 8, name: "String Hoppers", price: 400, category: "Mains" },
    { id: 9, name: "Milk Rice", price: 350, category: "Mains" }
];

function OrderPage() {
    const location = useLocation();
    const preselectedDish = location.state?.dish;

    const [form, setForm] = useState({
        dishId: preselectedDish ? preselectedDish.id : 1,
        name: "",
        email: "",
        qty: "1"
    });

    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);

    useEffect(() => {
        if (preselectedDish) {
            setForm(prev => ({ ...prev, dishId: preselectedDish.id }));
        }
    }, [preselectedDish]);

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
            const selectedDish = AVAILABLE_DISHES.find(d => d.id === Number(form.dishId)) || AVAILABLE_DISHES[0];
            const newOrder = {
                id: selectedDish.id,
                name: selectedDish.name,
                price: selectedDish.price,
                qty: Number(form.qty),
                category: selectedDish.category,
                image: "/dish-placeholder.jpg",
                customerName: form.name,
                customerEmail: form.email,
                date: new Date().toLocaleDateString()
            };

            // Save to localStorage
            const existing = JSON.parse(localStorage.getItem("campuseats_orders") || "[]");
            const updated = [newOrder, ...existing];
            localStorage.setItem("campuseats_orders", JSON.stringify(updated));

            setLastOrder(newOrder);
            setDone(true);
        }
    }

    if (done) {
        return (
            <div className="success-message">
                <h2>
                    <FiCheckCircle style={{ verticalAlign: "middle", marginRight: "8px", color: "#16a34a" }} />
                    Order Successful!
                </h2>
                <p style={{ margin: "10px 0 20px" }}>
                    Thanks, <strong>{form.name}</strong>! Your order for <strong>{form.qty}x {lastOrder?.name}</strong> has been received.
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <Link to="/orders" className="btn-primary">
                        <FiList style={{ verticalAlign: "middle", marginRight: "6px" }} />
                        View My Orders
                    </Link>
                    <button className="btn-secondary" onClick={() => setDone(false)}>
                        Order More
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: "20px"}}>
                    <label style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>
                        <MdOutlineFastfood /> Select Meal <span className="required-star">*</span>
                    </label>
                    <CustomSelect
                        options={AVAILABLE_DISHES}
                        value={form.dishId}
                        onChange={(dishId) => setForm(prev => ({ ...prev, dishId }))}
                    />
                </div>

                <div style={{marginBottom: "20px"}}>
                    <label style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>
                        <FiUser /> Full Name <span className="required-star">*</span>
                    </label>
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
                    <label style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>
                        <FiMail /> Email Address <span className="required-star">*</span>
                    </label>
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
                    <label style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", fontWeight: "bold", color: "#334155"}}>
                        <FiShoppingBag /> Number of Items <span className="required-star">*</span>
                    </label>
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

                <button type="submit" style={{width: "100%", padding: "14px", fontSize: "16px", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "8px"}}>
                    <FiSend /> Complete Order
                </button>
            </form>
        </div>
    );
}

export default OrderPage;