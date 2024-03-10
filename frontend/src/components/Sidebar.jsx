import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
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
  const navigate = useNavigate();
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const SignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("signout success");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign out error:", error);
      });
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
