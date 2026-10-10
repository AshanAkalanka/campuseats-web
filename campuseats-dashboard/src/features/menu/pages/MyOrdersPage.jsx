import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

const INITIAL_SAMPLE_ORDERS = [
    {
        id: 1,
        name: "Kottu Roti",
        price: 750,
        qty: 1,
        category: "Mains",
        image: "/dish-placeholder.jpg"
    },
    {
        id: 2,
        name: "Fried Rice",
        price: 850,
        qty: 1,
        category: "Mains",
        image: "/dish-placeholder.jpg"
    },
    {
        id: 5,
        name: "Iced Milo",
        price: 300,
        qty: 2,
        category: "Drinks",
        image: "/dish-placeholder.jpg"
    },
    {
        id: 4,
        name: "Watalappan",
        price: 350,
        qty: 1,
        category: "Dessert",
        image: "/dish-placeholder.jpg"
    }
];

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("campuseats_orders");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setOrders(parsed);
                    return;
                }
            } catch {
                // fall through to defaults
            }
        }
        // Initialize with default sample orders if none placed yet
        setOrders(INITIAL_SAMPLE_ORDERS);
        localStorage.setItem("campuseats_orders", JSON.stringify(INITIAL_SAMPLE_ORDERS));
    }, []);

    const clearOrders = () => {
        setOrders([]);
        localStorage.removeItem("campuseats_orders");
    };

    const totalAmount = orders.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty || 1)), 0);

    return (
        <div className="orders-page-container">
            <div className="orders-header-row">
                <h2>
                    <MdOutlineReceiptLong style={{ verticalAlign: "middle", marginRight: "8px", color: "#1e3a8a" }} />
                    My Orders
                </h2>
                {orders.length > 0 && (
                    <button className="btn-secondary" onClick={clearOrders} style={{ fontSize: "12px", padding: "6px 14px" }}>
                        <FiTrash2 style={{ verticalAlign: "middle", marginRight: "4px" }} />
                        Clear All
                    </button>
                )}
            </div>

            {orders.length === 0 ? (
                <div className="empty-orders-card">
                    <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 20px" }}>You haven't placed any orders yet.</p>
                    <Link to="/" className="btn-primary">
                        Browse Menu & Order
                    </Link>
                </div>
            ) : (
                <div className="orders-card">
                    {/* Header matching user reference */}
                    <h3 className="orders-card-title">Your Items</h3>

                    {/* Items List */}
                    <div className="orders-list">
                        {orders.map((item, index) => {
                            const itemImage = item.image || "/dish-placeholder.jpg";
                            const itemPrice = Number(item.price) || 0;
                            const itemQty = Number(item.qty) || 1;

                            return (
                                <div key={index} className="order-item-row">
                                    <img
                                        src={itemImage}
                                        alt={item.name}
                                        className="order-item-img"
                                    />
                                    <div className="order-item-info">
                                        <div className="order-item-name">{item.name}</div>
                                        <div className="order-item-price">
                                            Rs. {itemPrice.toFixed(2)} each
                                            {itemQty > 1 && (
                                                <span className="order-item-qty"> • Qty: {itemQty}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="order-item-subtotal">
                                        Rs. {(itemPrice * itemQty).toFixed(2)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary Footer */}
                    <div className="orders-footer">
                        <div className="orders-total-row">
                            <span>Total ({orders.length} items):</span>
                            <strong>Rs. {totalAmount.toFixed(2)}</strong>
                        </div>

                        <div className="orders-actions">
                            <Link to="/" className="btn-secondary">
                                <FiArrowLeft style={{ verticalAlign: "middle", marginRight: "4px" }} />
                                Back to Menu
                            </Link>
                            <Link to="/order" className="btn-primary">
                                <FiPlus style={{ verticalAlign: "middle", marginRight: "4px" }} />
                                Place Another Order
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyOrdersPage;
