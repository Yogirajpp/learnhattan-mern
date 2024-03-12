import { Link } from "react-router-dom";
import WalletButton from "./WalletButton";

const TopNavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="text-white font-bold">
              <span>Learn</span>
              <span className="ml-1">Hattan</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <Link to="/">
                <img src="/assets/images/logo2.png" alt="Learnhattan" className="h-8" />
              </Link>
            </div>
            <div>
              <WalletButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
