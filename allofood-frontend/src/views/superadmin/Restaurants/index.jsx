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
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/superadmin/restaurants'); // Fetch all restaurants
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  const deleteRestaurant = async (restaurantId) => {
    // Show confirmation dialog using SweetAlert2
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
        toast.success(response.data.message); // Notify success
        fetchAllRestaurants(); // Refresh list after deletion

        // Show success message in SweetAlert2
        Swal.fire({
          title: 'Deleted!',
          text: 'The restaurant has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      } catch (error) {
        console.error("Error deleting restaurant:", error.response); // Log the full error response
        toast.error("Failed to delete restaurant: " + (error.response?.data?.message || error.message)); // Notify error
      }
    } else {
      toast.info('Restaurant deletion canceled'); // Notify cancellation
    }
  };

  return (
    <div className="mt-5">
      <ToastContainer /> {/* Toast container to render the toast messages */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/add-restaurant')}
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Go to Add Restaurant
        </button>
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
                      onClick={() => deleteRestaurant(restaurant._id)}
                      className="text-white bg-red-600 hover:bg-red-700 p-2 rounded"
                    >
                      Delete
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
