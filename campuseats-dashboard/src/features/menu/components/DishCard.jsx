import { Link } from "react-router-dom";

function DishCard({ dish }) {
    // Consistent image for each dish using picsum seed
    const imageUrl = `https://picsum.photos/seed/${dish.id}/500/350`;

    return (
        <div className="dish-card">
            <div className="dish-image-wrapper">
                <img src={imageUrl} alt={dish.name} className="dish-image" />
                {!dish.available && (
                    <span className="sold-out">Sold out</span>
                )}
            </div>

            <div className="dish-card-body">
                <h3>{dish.name}</h3>

                <p className="dish-price">
                    Rs. {Number(dish.price).toFixed(2)}
                </p>

                <p className="dish-category">
                    {dish.category}
                </p>

                <Link
                    className="details-link"
                    to={`/dish/${dish.id}`}
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
}

export default DishCard;