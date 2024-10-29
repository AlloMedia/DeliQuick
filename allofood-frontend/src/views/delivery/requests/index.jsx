import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../../api/config/axios';
import { formatDate, formatTime } from '../../../helpers/date-format';
import statusStyles from '../../../helpers/status-data';
import 'react-toastify/dist/ReactToastify.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/delivery/requests');
      
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error(error.response?.data?.message || 'Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (orderId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put('/delivery/accept-request', { orderId });

      await fetchRequests();
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error(error.response?.data?.message || 'Error accepting request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Order
              </th>
              <th scope="col" className="pr-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>              
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No requests available
                </td>
              </tr>
            ) : (
              requests.map((request) => {
                const { bgColor, icon } = statusStyles[request.status] || {};
                return (
                  <tr
                    key={request.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${request.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${request.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    #{request._id.slice(-4)}
                    </th>
                    <td className='space-x-3'>
                      <span>{formatDate(request.createdAt)}</span>
                      <span>{formatTime(request.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-[0.88rem] py-1 px-2 flex items-center justify-center space-x-1 rounded-full font-bold ${bgColor}`}>
                          <span>{icon}</span>
                          <span>{request.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{request.user.address}</td>
                    <td className="px-6 py-4">${request.totalPrice}</td>
                    <td className="flex items-center px-6 py-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        onClick={() => handleAcceptRequest(request._id)}
                        disabled={loading || request.status !== 'Ready'}
                      >
                        {loading ? 'Processing...' : 'Accept'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;