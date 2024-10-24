import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/config/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    user: '', 
    images: {
      banner: null,
      profileImage: null,
      slides: [],
    },
    address: '',
    phone: '',
    status: 'open',
    isAproved: false,
  });

  const navigate = useNavigate();
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get(`/superadmin/restaurant/${restaurantId}`);
        setRestaurant((prev) => ({
          ...prev,
          ...response.data.restaurant,
          user: response.data.restaurant.user || '', 
        }));
      } catch (error) {
        toast.error("Erreur lors du chargement du restaurant : " + (error.response?.data?.message || error.message));
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setRestaurant((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [name]: files.length > 0 ? files[0] : null,
      },
    }));
  };

  const handleSlidesChange = (e) => {
    const files = Array.from(e.target.files);
    setRestaurant((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        slides: [...prev.images.slides, ...files],
      },
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!restaurant.user) {
      toast.error("L'ID de l'utilisateur est requis pour mettre à jour le restaurant.");
      return;
    }

    const formData = new FormData();

    Object.entries(restaurant).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value);
      }
    });

    if (restaurant.images.banner) {
      formData.append('banner', restaurant.images.banner);
    }
    if (restaurant.images.profileImage) {
      formData.append('profileImage', restaurant.images.profileImage);
    }
    restaurant.images.slides.forEach((slide) => {
      formData.append('slides', slide);
    });

    try {
      const response = await axiosInstance.put(`/superadmin/edit/${restaurantId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      toast.error("Failed to update restaurant: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl mb-4">Edit Restaurant</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleInputChange}
            className="block p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Description:</label>
          <textarea
            name="description"
            value={restaurant.description}
            onChange={handleInputChange}
            className="block p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>User ID:</label>
          <input
            type="text"
            name="user"
            value={restaurant.user}
            onChange={handleInputChange}
            className="block p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Banner Image:</label>
          <input
            type="file"
            name="banner"
            onChange={handleImageChange}
            className="block p-2 border border-gray-300 w-full"
          />
        </div>

        <div className="mb-4">
          <label>Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleImageChange}
            className="block p-2 border border-gray-300 w-full"
          />
        </div>

        <div className="mb-4">
          <label>Slide Images:</label>
          <input
            type="file"
            name="slides"
            multiple 
            onChange={handleSlidesChange}
            className="block p-2 border border-gray-300 w-full"
          />
        </div>

        <div className="mb-4">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={restaurant.address}
            onChange={handleInputChange}
            className="block p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={restaurant.phone}
            onChange={handleInputChange}
            className="block p-2 border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Status:</label>
          <select
            name="status"
            value={restaurant.status}
            onChange={handleInputChange}
            className="block p-2 border border-gray-300 w-full"
          >
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
        </div>

        <div className="mb-4">
          <label>
            Is Approved:
            <input
              type="checkbox"
              name="isAproved"
              checked={restaurant.isAproved}
              onChange={(e) => setRestaurant({ ...restaurant, isAproved: e.target.checked })}
              className="ml-2"
            />
          </label>
        </div>

        <button type="submit" className="text-white bg-green-600 hover:bg-green-700 p-2 rounded">
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
