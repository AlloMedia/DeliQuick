import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ image01, price, _id: productId, name }) => {
  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user._id) {
        console.error('User ID not found in localStorage');
        return;
      }

      const userId = user._id;
      console.log('User ID:', userId);
      console.log('Product ID:', productId); 

      const response = await axios.post('http://localhost:3001/client/add', {
        userId,
        productId,
        name,
        price,
      });

      if (response.status === 200) {
        console.log('Item added to cart successfully');
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('An error occurred while adding item to cart:', error);
    }
  };

  return (
    <div className="text-center p-6 border">
      <div className="product__image flex items-center justify-center mb-4">
        <img
          src={image01}
          alt="product-image"
          className="w-1/2 transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
        />
      </div>
      <h4 className="font-semibold text-sm mb-4">
        <Link to={`/foods/${productId}`}>{name}</Link>
      </h4>
      <div className="flex items-center justify-between">
        <p className="text-[#DF2020] font-bold text-base">
          <span className="font-semibold text-[1.2rem]">{`$${price}`}</span>
        </p>
        <button
          className="bg-[#DF2020] text-white px-4 py-2 text-sm rounded-lg"
          onClick={handleAddToCart} 
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
