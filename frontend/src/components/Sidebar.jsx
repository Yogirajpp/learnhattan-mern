import { useState } from "react";
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

  return (
    <div className={`sideMenu ${isOpen ? "open" : ""}`}>
      <div className="menu-toggle">
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
          <button className="sidebar-link" onClick={SignOut}>
            <FaSignOutAlt />
            {isOpen && <span>Sign out</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;