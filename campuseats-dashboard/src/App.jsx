import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { MdRestaurantMenu, MdOutlineShoppingBag, MdOutlineReceiptLong } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";
import MyOrdersPage from "./features/menu/pages/MyOrdersPage";
import "./App.css";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <div className="app-container">
        <header className="navbar">
          <div className="brand">
            <FaGraduationCap style={{ marginRight: "8px", verticalAlign: "middle" }} />
            CampusEats
          </div>

          {/* Hamburger Menu Toggle on Mobile (Right side) */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MdRestaurantMenu style={{ marginRight: "6px", verticalAlign: "middle", fontSize: "16px" }} />
              Menu
            </NavLink>
            <span className="nav-separator" aria-hidden="true" />
            <NavLink 
              to="/order" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MdOutlineShoppingBag style={{ marginRight: "6px", verticalAlign: "middle", fontSize: "16px" }} />
              Place Order
            </NavLink>
            <span className="nav-separator" aria-hidden="true" />
            <NavLink 
              to="/orders" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MdOutlineReceiptLong style={{ marginRight: "6px", verticalAlign: "middle", fontSize: "16px" }} />
              My Orders
            </NavLink>
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
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="*" element={<p>404 — Page not found</p>} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <FaGraduationCap style={{ marginRight: "6px", verticalAlign: "middle" }} />
              CampusEats
            </div>
            <p className="footer-text">
              © {new Date().getFullYear()} CampusEats. Fresh & convenient campus dining.
            </p>
            <div className="footer-links">
              <NavLink to="/">Menu</NavLink>
              <span>•</span>
              <NavLink to="/order">Place Order</NavLink>
              <span>•</span>
              <NavLink to="/orders">My Orders</NavLink>
            </div>
          </div>
        </footer>
      </div>
  );
}
