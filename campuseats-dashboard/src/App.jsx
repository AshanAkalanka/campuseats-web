import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";
import "./App.css";

export default function App() {

  return (
      <div className="app-container">
        <header className="navbar">
          <div className="brand">🎓 CampusEats</div>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Menu</NavLink>
            <NavLink to="/order" className={({ isActive }) => isActive ? "active-link" : ""}>Place Order</NavLink>
          </nav>
        </header>
        
        <div className="hero-banner">
          <h1>Campus Dining & Refreshments</h1>
          <p>Order your favorite meals, drinks, and snacks right on campus</p>
        </div>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/dish/:id" element={<DishDetailPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="*" element={<p>404 — Page not found</p>} />
          </Routes>
        </main>
      </div>
  );
}
