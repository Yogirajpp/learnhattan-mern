import { useState } from "react";
<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { FaBars, FaGraduationCap, FaNewspaper, FaShoppingCart, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css"; // Import your CSS file

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  
  const handleLogout = async () => {
    try {
      // Clear the authentication token from local storage or any other client-side storage
      localStorage.removeItem("authToken");

      // Redirect to the login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
=======
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import {
  FaBars,
  FaGraduationCap,
  FaNewspaper,
  FaShoppingCart,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css"; // Import your CSS file

const Sidebar = () => {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(true);

  const SignOut = async () => {
    logout();
  };
>>>>>>> ee6eb2a5cce590c78ce894e29a23075ab6ed8848

  return (
    <div className={`sideMenu ${isOpen ? "open" : ""}`}>
      <div className="menu-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <ul>
        <li>
          <Link to="/Courses" className="sidebar-link">
            <FaGraduationCap />
            {isOpen && <span>Courses</span>}
          </Link>
        </li>
        <li>
          <Link to="/PostPage" className="sidebar-link">
            <FaNewspaper />
            {isOpen && <span>Posts</span>}
          </Link>
        </li>
        <li>
          <Link to="/Marketplace" className="sidebar-link">
            <FaShoppingCart />
            {isOpen && <span>Marketplace</span>}
          </Link>
        </li>
        <li>
          <Link to="/Dashboard" className="sidebar-link">
            <FaTachometerAlt />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <button className="sidebar-link" onClick={handleLogout}>
            <FaSignOutAlt />
            {isOpen && <span>Sign out</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
