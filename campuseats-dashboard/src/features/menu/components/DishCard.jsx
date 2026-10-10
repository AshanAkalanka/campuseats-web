import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function DishCard({ dish }) {
    // Uses the custom illustration from public/ folder (or dish.imageUrl if set)
    const imageUrl = dish.imageUrl || "/dish-placeholder.jpg";

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
                    View Details <FiArrowRight style={{ verticalAlign: "middle", marginLeft: "4px" }} />
                </Link>
            </div>
        </div>
    );
}

export default DishCard;