// TopNavBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./TopNavBar.css";
import "./WalletButton";
import WalletButton from "./WalletButton";

const TopNavBar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="top-navbar">
      <div className="top-nav-container">
        {/* <div className="top-nav-wallet-heading">
          <span className="top-nav-wallet-heading-1">Learn</span>
          <span className="top-nav-wallet-heading-2">Hattan</span>
        </div> */}

        <div className="logo">
          <Link to="/Dashboard">
            <img src="/assets/images/logo2.png" alt="Learnhattan" />
          </Link>
        </div>

        {/* Wallet Button */}
        <div className="top-nav-wallet-button">
          <span className="top-nav-wallet-btn">
            <WalletButton />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
