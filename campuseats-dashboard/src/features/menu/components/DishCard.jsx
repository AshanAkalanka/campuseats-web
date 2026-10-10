import { Link } from "react-router-dom";

function DishCard({ dish }) {
    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>

            <p className="dish-price">
                Rs. {dish.price.toFixed(2)}
            </p>

            <small>{dish.category}</small>

            {!dish.available && (
                <span className="sold-out">Sold out</span>
            )}

            <Link
                className="details-link"
                to={`/dish/${dish.id}`}
            >
                View Details →
            </Link>
        </div>
    );
}

export default DishCard;