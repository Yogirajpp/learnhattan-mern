import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import WalletButton from "./WalletButton";
import { FaBook, FaUserGroup } from "react-icons/fa6";
import { RiPieChart2Fill } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const SignOut = async () => {
    logout();
    navigate("/login");
  };
  const sidebarClass = `fixed top-0 left-0 z-40 w-52 shadow-xl h-screen pt-20 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`;

  const menuItemClass =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
  const iconClass =
    "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
  return (
    <>
      {/************Topnavbar**********/}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <TiThMenu />
              </button>
              <div className="flex ms-2 md:me-24">
                <img
                  src="/assets/images/logoSymbol.png"
                  className="h-8 me-3"
                  alt="learnhattan Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Learnhattan
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <WalletButton />
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/************Sidebar**********/}
      <aside id="logo-sidebar" className={sidebarClass} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={`/dashboard`} className={menuItemClass}>
                <RiPieChart2Fill className={iconClass} />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/courses" className={menuItemClass}>
                <FaBook className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className={menuItemClass}>
                <FaShoppingCart className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  MarketPlace
                </span>
              </Link>
            </li>
            <li>
              <Link to="/Contributor" className={menuItemClass}>
                <FaUserGroup className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Contributor
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={SignOut}
                className="flex items-center p-2 pr-20 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaSignOutAlt className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
