import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import MenuList from "../components/MenuList";

function MenuPage() {
    const [query, setQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const debounced = useDebounce(query, 300);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5207";
        
        // Try backend API first, fallback to /menu.json
        fetch(`${apiUrl}/api/menu`)
            .then((res) => {
                if (!res.ok) throw new Error("API failed");
                return res.json();
            })
            .then((data) => {
                const excluded = ["samosa", "chocolate brownie", "fruit salad", "lime juice", "milk tea", "test123"];
                const validApiDishes = (data || []).filter(d => !excluded.some(ex => d.name.toLowerCase().includes(ex)));
                if (validApiDishes.length >= 8) {
                    setDishes(validApiDishes);
                    setIsLoading(false);
                } else {
                    fetch("/menu.json")
                        .then((res) => res.json())
                        .then((jsonData) => {
                            setDishes(jsonData);
                            setIsLoading(false);
                        })
                        .catch(() => {
                            setDishes(validApiDishes);
                            setIsLoading(false);
                        });
                }
            })
            .catch(() => {
                fetch("/menu.json")
                    .then((res) => res.json())
                    .then((data) => {
                        setDishes(data);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setError(err.message);
                        setIsLoading(false);
                    });
            });
    }, []);

    if (isLoading) {
        return <p style={{textAlign: "center", marginTop: "40px", fontSize: "16px", color: "#64748b"}}>Loading menu items...</p>;
    }

    if (error && (!dishes || dishes.length === 0)) {
        return <p style={{textAlign: "center", color: "red", marginTop: "40px"}}>Could not load menu: {error}</p>;
    }

    // Filter out any "test123" and the 5 removed items from the UI if present
    const excludedNames = ["test123", "samosa", "chocolate brownie", "fruit salad", "lime juice", "milk tea"];
    const cleanDishes = (dishes || []).filter(d => !excludedNames.some(ex => d.name.toLowerCase().includes(ex)));

    // Category filtering
    const categories = ["All", ...new Set(cleanDishes.map(d => d.category))];

    const filtered = cleanDishes.filter((dish) => {
        const matchesQuery = dish.name.toLowerCase().includes(debounced.toLowerCase());
        const matchesCategory = categoryFilter === "All" || dish.category === categoryFilter;
        return matchesQuery && matchesCategory;
    });

    return (
        <div>
            <h2>Campus Menu</h2>
            <div className="search-container">
                <input
                    className="search-bar"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search dishes..."
                />
            </div>

            {/* Category Filter Pills */}
            <div className="category-filters">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        className={`category-pill ${categoryFilter === cat ? "active" : ""}`}
                        onClick={() => setCategoryFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <MenuList dishes={filtered} />
        </div>
    );
}

export default MenuPage;