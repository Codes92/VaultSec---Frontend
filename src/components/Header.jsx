import { useState, useEffect, useRef } from "react";
import {useAuth} from "../services/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

import "../styles/header.css"

export default function Header()
{
    // Hamburger menu on small screens
    const [menuOpen, setMenuOpen] = useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();
    const navRef = useRef(null);
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const closeMenu = () => setMenuOpen(false);

    // Code to close the menu when user clicks outside or away from it
    useEffect(() => {
        // Helper function to run whenever user clicks
        const handleClickOutside = (e) => {
            // a) is the menu there, and b) did the person click inside the menu?
            if (navRef.current && !navRef.current.contains(e.target))
            {
                // Close the menu
                setMenuOpen(false);
            }
        };
        // Listen for mouse click anywhere on the page, and run the helper function
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup to prevent computer listening after
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="app-navbar">
            <div className="navbar-left">
                <NavLink to="/vault" className="logo-link">
                    VaultSec
                </NavLink>
            </div>

            <button className="hamburger"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle Menu"
                aria-expanded={menuOpen}
            >
                ☰
            </button>

            <div className={`navbar-right ${menuOpen ? 'mobile-open' : ''}`}>
                <NavLink to="/vault" className="nav-link" onClick={closeMenu}>Vault</NavLink>
                <NavLink to="/security-tools" className="nav-link" onClick={closeMenu}>Security Tools</NavLink>
                <NavLink to="/news" className="nav-link" onClick={closeMenu}>News Feed</NavLink>
                <NavLink to="/settings" className="nav-link" onClick={closeMenu}>Settings</NavLink>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
}