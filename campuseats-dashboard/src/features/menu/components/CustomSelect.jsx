import { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuUtensils, LuCupSoda, LuCakeSlice, LuPizza } from "react-icons/lu";

function getCategoryIcon(category) {
    switch (category?.toLowerCase()) {
        case "drinks":
            return <LuCupSoda className="select-opt-icon" />;
        case "dessert":
            return <LuCakeSlice className="select-opt-icon" />;
        case "snacks":
            return <LuPizza className="select-opt-icon" />;
        default:
            return <LuUtensils className="select-opt-icon" />;
    }
}

export default function CustomSelect({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const selectedDish = options.find((opt) => opt.id === Number(value)) || options[0];

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSelect = (id) => {
        onChange(id);
        setIsOpen(false);
    };

    return (
        <div className="custom-select-wrap" ref={selectRef}>
            {/* Trigger Box matching reference image */}
            <div
                className={`custom-select-box ${isOpen ? "is-open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            >
                <div className="selected-value-content">
                    <span className="selected-icon-box">
                        {getCategoryIcon(selectedDish?.category)}
                    </span>
                    <span className="selected-dish-name">
                        {selectedDish?.name}
                    </span>
                    <span className="selected-dish-price">
                        — Rs. {Number(selectedDish?.price || 0).toFixed(2)}
                    </span>
                </div>
                <LuChevronDown className={`select-arrow ${isOpen ? "arrow-up" : ""}`} />
            </div>

            {/* Dropdown Menu matching reference image */}
            {isOpen && (
                <div className="custom-select-menu">
                    {options.map((dish) => {
                        const isSelected = dish.id === selectedDish?.id;
                        return (
                            <div
                                key={dish.id}
                                className={`custom-select-item ${isSelected ? "item-selected" : ""}`}
                                onClick={() => handleSelect(dish.id)}
                            >
                                <span className="item-icon-box">
                                    {getCategoryIcon(dish.category)}
                                </span>
                                <span className="item-label">{dish.name}</span>
                                <span className="item-price-tag">
                                    Rs. {Number(dish.price).toFixed(2)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
