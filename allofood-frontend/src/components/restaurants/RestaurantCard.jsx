// RestaurantCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ name, description, imageUrl, address, id }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/restaurants/${id}`); 
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image Section */}
      <div className="h-40 w-full bg-gray-200">
        <img
          src={imageUrl || 'https://via.placeholder.com/150'} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-gray-600 mt-2">{address}</p> 

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-[#DF2020] text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
