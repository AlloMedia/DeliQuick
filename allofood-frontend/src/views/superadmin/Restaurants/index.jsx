import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/config/axios';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/superadmin/restaurants');
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  const searchRestaurants = async (query) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('http://localhost:3001/superadmin/search', {
        params: { query },
      });
      setRestaurants(response.data.restaurants); 
      setLoading(false);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      setLoading(false);
      setRestaurants([]);
    }
  };

  // Debounce function to delay the search
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      fetchAllRestaurants();
    } else {
      debounceSearch(value);
    }
  };

  const debounceSearch = debounce((query) => {
    searchRestaurants(query);
  }, 300); 

  const deleteRestaurant = async (restaurantId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this restaurant? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/superadmin/restaurants/${restaurantId}`);
        toast.success(response.data.message);
        fetchAllRestaurants();

        Swal.fire({
          title: 'Deleted!',
          text: 'The restaurant has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      } catch (error) {
        console.error("Error deleting restaurant:", error.response);
        toast.error("Failed to delete restaurant: " + (error.response?.data?.message || error.message));
      }
    } else {
      toast.info('Restaurant deletion canceled');
    }
  };

  return (
    <div className="mt-5">
      <ToastContainer />
      <div className="mb-4">
        <button
          onClick={() => navigate('/add-restaurant')}
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Go to Add Restaurant
        </button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-4">
        <label htmlFor="SearchTerm" className="sr-only">Search</label>
        <input
          type="text"
          id="SearchTerm"
          placeholder="Search by name or address..."
          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              restaurants.map((restaurant) => (
                <tr key={restaurant._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {restaurant.name}
                  </th>
                  <td className="px-6 py-4">{restaurant.description}</td>
                  <td className="px-6 py-4">{restaurant.phone}</td>
                  <td className="px-6 py-4">{restaurant.isAproved ? 'Approved' : 'Not Approved'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/restaurant-details/${restaurant._id}`)} 
                      className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded mr-2"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => deleteRestaurant(restaurant._id)}
                      className="text-white bg-red-600 hover:bg-red-700 p-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit-restaurant/${restaurant._id}`)}
                      className="text-white bg-green-600 hover:bg-green-700 p-2 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurants;
