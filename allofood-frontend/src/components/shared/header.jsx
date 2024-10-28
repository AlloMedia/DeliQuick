import { useContext } from "react";
import { ShoppingCart, User } from "lucide-react";
import logo from "../../assets/images/res-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "context/auth/AuthContext";

const Header = () => {
  const { user } = useAuth();

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
        {user ? (
          <Link to="/profile">
            <User className="text-gray-700" />
          </Link>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/register">
              <button className="py-2 px-3 text-sm text-white bg-red-500 rounded-lg">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="py-2 px-3 text-sm text-white bg-gray-800 rounded-lg">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
