import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from '../../api/config/axios'; 
import Header from 'components/shared/header';

const Cart = () => {
  const { userId } = useParams(); 
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/client/cart/${userId}`); 
        setCartItems(response.data.items);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId]);

  useEffect(() => {
    // Calculate the total price whenever cartItems changes
    const calculatedTotal = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
    setTotalPrice(calculatedTotal);
  }, [cartItems]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, idx) =>
      idx === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedCartItems);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={item._id} className="flex items-center gap-4">
                  <img
                    src={item.item.image} 
                    alt={item.item.name}   
                    className="size-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-sm text-gray-900">{item.item.name}</h3> 
                    <dl className="mt-0.5 space-y-px text-gray-600">
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">£{item.item.price}</dd> 
                      </div>
                      <div>
                        <dt className="inline">Quantity:</dt>
                        <dd className="inline">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                          />
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="flex flex-1 items-center justify-end gap-2">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      Remove item
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total Price */}
            <div className="mt-8 flex justify-end text-xl font-semibold text-gray-900">
              Total Price: £{totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
