import { ShoppingCart, User } from "lucide-react";
import logo from "../../assets/images/res-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-[85%] mx-auto flex justify-between items-center py-6">
      <div className="flex items-center">
        <img src={logo} alt="Tasty Treat Logo" className="w-12 h-12" />
        <span className="ml-2 text-md font-bold">Tasty Treat</span>
      </div>
      <nav>
        <ul className="flex space-x-16">
          <li>
            <a href="/" className="font-semibold text-red-500">
              Home
            </a>
          </li>
          <li>
            <a href="/#" className="font-semibold text-gray-700">
              Foods
            </a>
          </li>
          <li>
            <a href="/#" className="font-semibold text-gray-700">
              Cart
            </a>
          </li>
          <li>
            <a href="/#" className="font-semibold text-gray-700">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Link to="/cart">
          <ShoppingCart className="text-gray-700" />
        </Link>
        <Link to="/login">
          <User className="text-gray-700" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
