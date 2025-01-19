import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Task management
      </Link>

      <div
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={isMenuOpen ? "responsive" : ""}>
        <li>
          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={() => localStorage.removeItem("token")}>
            LogOut
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
