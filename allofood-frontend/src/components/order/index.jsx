import React, { useState, useEffect } from 'react';
import axiosInstance from 'api/config/axios';
import OrderCard from 'components/order/components';
import FilterAndSearch from 'components/order/components/filter';
import OrderDetailsModal from './components/modal';
import EditOrderModal from './components/modal/edit';
import { useAuth } from 'context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (user?._id) fetchOrders(user._id);
  }, [user]);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      let response;
      
      if (user?.role === 'manager') {
        response = await axiosInstance.get('/manager/orders');
      } else {
        // Ensure the deliveryId is passed as a string query parameter
        response = await axiosInstance.get('/delivery/orders', {
          params: {
            deliveryId: userId
          }
        });
      }
      
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    const { status } = filters;
    if (status) {
      setFilteredOrders(orders.filter(order => order.status === status));
    } else {
      setFilteredOrders(orders);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!user?._id) {
      toast.error('User not authenticated');
      return;
    }
    setLoading(true);
    try {
      user?.role === 'manager' 
        ? 
          (await axiosInstance.put(`/manager/orders/${orderId}`, { status: newStatus }))
        : 
          (await axiosInstance.put(`/delivery/orders/${orderId}`, { status: newStatus }));

      await fetchOrders(user._id); // Refresh the order list
      toast.success('Order status updated successfully');
      closeEditModal(); // Close the modal after successful update
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
  };

  const LoadingSpinner = () => (
    <span className="h-screen flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Loading...
    </span>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='flex justify-between'>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <FilterAndSearch onFilter={handleFilter} />
          </div>
          {filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order._id} 
                  order={order} 
                  onClick={() => openModal(order)} 
                  onEdit={() => openEditModal(order)}
                />
              ))}
            </div>
          ) : (
            <p className="md:mt-32 text-center text-gray-400">No orders found</p>
          )}

          {selectedOrder && (
            <>
              <OrderDetailsModal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                order={selectedOrder} 
              />
              <EditOrderModal 
                isOpen={isEditModalOpen} 
                onRequestClose={closeEditModal} 
                order={selectedOrder} 
                onUpdateStatus={handleUpdateStatus}
                isLoading={loading}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;