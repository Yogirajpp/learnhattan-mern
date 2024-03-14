import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import {
  FaBars,
  FaGraduationCap,
  // FaNewspaper,
  FaShoppingCart,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css"; // Import your CSS file

const Sidebar = () => {
  // const { user2 } = useParams();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [isOpen] = useState(true);

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const SignOut = async () => {
    logout();
    navigate('/login');
  };
  

  return (
    <div className={`sideMenu ${isOpen ? "open" : ""}`}>
      <div className="menu-toggle">
        <FaBars />
      </div>
      <ul>
        <li>
          <Link to="/courses" className="sidebar-link">
            <FaGraduationCap />
            {isOpen && <span>Courses</span>}
          </Link>
        </li>
        {/* <li>
          <Link to="/PostPage" className="sidebar-link">
            <FaNewspaper />
            {isOpen && <span>Posts</span>}
          </Link>
        </li> */}
        <li>
          <Link to="/marketplace" className="sidebar-link">
            <FaShoppingCart />
            {isOpen && <span>Marketplace</span>}
          </Link>
        </li>
        <li>
        <Link to={`/dashboard`} className="sidebar-link">
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
// import React, { useState } from 'react';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-white border-r 
//           ${isOpen ? 'block' : 'hidden'}`}
//       >
//         {/* Sidebar content */}
//         <div className="flex items-center justify-center h-16 border-b">
//           <span className="text-xl font-bold">Sidebar</span>
//         </div>
//         <div className="p-4">
//           <ul>
//             <li className="py-2">Item 1</li>
//             <li className="py-2">Item 2</li>
//             <li className="py-2">Item 3</li>
//           </ul>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col flex-1 w-full">
//         <div className="flex items-center justify-between h-16 bg-white border-b">
//           <button
//             onClick={toggleSidebar}
//             className="text-gray-500 hover:text-black focus:outline-none"
//           >
//             {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
//           </button>
//           <span className="text-xl font-bold">Main Content</span>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Main content here */}
//           <p>Main content goes here.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
