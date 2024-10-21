import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../../api/config/axios';
import 'react-toastify/dist/ReactToastify.css';

const Requests = () => {
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchUnapprovedRestaurants();
  }, []);

  const fetchUnapprovedRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/superadmin/Restaurant/unapproved');
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching unapproved restaurants:", error);
      setLoading(false);
    }
  };

  const updateApprovalStatus = async (restaurantId, isAproved) => {
    try {
      const response = await axiosInstance.put(`/superadmin/restaurants/reject-or-accept/${restaurantId}`, { isAproved });
      toast.success(response.data.message); // Notify user of success
      fetchUnapprovedRestaurants(); // Refresh the list after update
    } catch (error) {
      console.error("Error response:", error.response); // Log the full error response
      toast.error("Failed to update approval status: " + (error.response?.data?.message || error.message)); // Notify user of error
    }
  };

  return (
    <div className="mt-5">
      <ToastContainer />
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
              requests.map((request) => (
                <tr key={request._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {request.name}
                  </th>
                  <td className="px-6 py-4">{request.description}</td>
                  <td className="px-6 py-4">{request.phone}</td>
                  <td className="px-6 py-4">{request.isAproved ? 'Approved' : 'Not Approved'}</td>
                  <td className="px-6 py-4"> {/* Actions cell now last */}
                    <select
                      value={request.isAproved ? 'approved' : 'not-approved'}
                      onChange={(e) => updateApprovalStatus(request._id, e.target.value === 'approved')}
                      className="border border-gray-300 rounded p-2"
                    >
                      <option value="not-approved">Reject</option>
                      <option value="approved">Accept</option>
                    </select>
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

export default Requests;
