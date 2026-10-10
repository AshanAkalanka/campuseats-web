import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function DishDetailPage() {
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5207";

        fetch(`${apiUrl}/api/menu/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("API failed");
                return res.json();
            })
            .then((data) => {
                setDish(data);
                setIsLoading(false);
            })
            .catch(() => {
                fetch("/menu.json")
                    .then((res) => res.json())
                    .then((all) => {
                        const found = all.find(item => item.id === Number(id));
                        setDish(found || null);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setError(err.message);
                        setIsLoading(false);
                    });
            });
    }, [id]);

    if (isLoading) {
        return <p style={{textAlign: "center", marginTop: "40px", color: "#64748b"}}>Loading dish details...</p>;
    }

    if (error || !dish) {
        return (
            <div style={{textAlign: "center", marginTop: "40px"}}>
                <p>Dish not found.</p>
                <Link to="/" className="btn-secondary">← Back to menu</Link>
            </div>
        );
    }

    const imageUrl = `https://picsum.photos/seed/${dish.id}/600/400`;

    return (
        <div className="dish-details">
            <img src={imageUrl} alt={dish.name} className="dish-details-img" />
            <div className="dish-details-body">
                <h2>{dish.name}</h2>
                
                <p className="dish-price" style={{fontSize: "22px", marginBottom: "8px"}}>
                    Rs. {Number(dish.price).toFixed(2)}
                </p>

                <p className="dish-category" style={{marginBottom: "16px"}}>
                    {dish.category}
                </p>

                <p style={{marginBottom: "24px"}}>
                    <strong>Availability: </strong>
                    {dish.available ? (
                        <span style={{color: "#16a34a", fontWeight: "600"}}>Available</span>
                    ) : (
                        <span className="sold-out">Sold out</span>
                    )}
                </p>
                
                <div style={{display: "flex", gap: "12px"}}>
                    <Link to="/" className="btn-secondary">
                        ← Back to Menu
                    </Link>
                    <Link to="/order" className="btn-primary">
                        Place Order
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DishDetailPage;