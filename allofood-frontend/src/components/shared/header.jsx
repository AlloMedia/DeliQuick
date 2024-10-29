import { useContext } from "react";
import { ShoppingCart, User } from "lucide-react";
import logo from "../../assets/images/res-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "context/auth/AuthContext";
import { useState } from "react";
import PublicRoute from "components/auth/PublicRoute";

const CartLink = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : '';

  return (
    <Link to={`/cart/${userId}`}>
      <ShoppingCart className="text-gray-700" />
    </Link>
  );
};
const Header = () => {
  const { user } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <CartLink />
        {user ? (
          <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={toggleDropdown}
          >
            <img src={'http://localhost:3001/uploads/pp.jpg'} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <div>
            <div className="text-gray-700" style={{textAlign:'left'}}>{user.name}</div>
            <div className="text-gray-700">{user.email}</div>
            </div>
            
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <Link to="/switch-to-restaurant">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Switch to restaurant
                </button>
              </Link>
              <a href="/logout">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </a>
            </div>
          )}
        </div>
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
