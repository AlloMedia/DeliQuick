import React, { useEffect, useState } from 'react';
import axios from '../../api/config/axios';
import RestaurantCard from './RestaurantCard';

const RestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filterRestaurants = () => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants/approved');
        setRestaurants(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="w-[85%] mx-auto mt-24">
      <h2 className="text-3xl text-center font-bold mb-8">Restaurants</h2>
      <div className="bg-[#DF2020] py-5 mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 rounded-lg">
        <input
          type="text"
          placeholder="Search by Name or Address" // Changed placeholder text for clarity
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-10 py-2 w-3/4 md:w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF2020] placeholder-gray-300" // Added placeholder styling
        />
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filterRestaurants().length === 0 ? (
          <p>No approved restaurants available.</p>
        ) : (
          filterRestaurants().map((restaurant) => (
            <div className="mt-5" key={restaurant._id}>
              <RestaurantCard
                name={restaurant.name}
                description={restaurant.description}
                imageUrl={restaurant.images?.banner}
                address={restaurant.address} // Pass address here
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RestaurantsSection;
