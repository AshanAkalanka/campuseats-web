import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
    const { id } = useParams();

    const {
        data: dishes,
        isLoading,
        error
    } = useFetch("/menu.json");

    if (isLoading) {
        return <p>Loading dish details...</p>;
    }

    if (error) {
        return <p>Could not load dish: {error}</p>;
    }

    const dish = dishes.find(
        (item) => item.id === Number(id)
    );

    if (!dish) {
        return (
            <div>
                <p>Dish not found.</p>
                <Link to="/">← Back to menu</Link>
            </div>
        );
    }

    return (
        <div className="dish-details">
            <h2>{dish.name}</h2>

            <p><strong>Price:</strong> Rs. {dish.price.toFixed(2)}</p>

            <p><strong>Category:</strong> {dish.category}</p>

            <p><strong>Availability:</strong>{" "}{dish.available ? "Available" : "Sold out"}</p>
            <Link to="/">← Back to menu</Link>
        </div>
    );
}

export default DishDetailPage;