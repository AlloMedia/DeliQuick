import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ image01, price, id, name }) => {
  // Function to handle adding item to cart
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/add', {
        productId: id,
        name,
        price,
      });

      if (response.status === 200) {
        // Handle successful response
        console.log('Item added to cart successfully');
      } else {
        // Handle errors
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
        <Link to={`/foods/${id}`}>{name}</Link>
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
