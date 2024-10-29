import React, { useState, useEffect } from "react";
import axios from "../../api/config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
    restaurantId: "671b4aecb3f682cacfc01212",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/manager/categories")
      .then((response) => {
        const fetchedCategories = response.data.categories;
        console.log("Fetched categories:", fetchedCategories);
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching the categories:", error);
        toast.error("Error fetching the categories");
      });
  }, []);

  const fetchItems = () => {
    axios
      .get("/api/allItems")
      .then((response) => {
        const fetchedProducts = response.data;
        setItems(fetchedProducts);
      })
      .catch((error) => {
        console.error("Error fetching the items:", error);
        toast.error("Error fetching the items");
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewItem({ ...newItem, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentItem({ ...currentItem, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = (updatedItem) => {
    updatedItem.id = currentItem._id;
    console.log("Updated item:", updatedItem);

    axios
      .put(`/manager/items/edit`, updatedItem)
      .then((response) => {
        setIsEditModalOpen(false);
        toast.success("Item edited successfully!");
        fetchItems();
      })
      .catch((error) => {
        console.error("Error editing the item:", error);
        toast.error("Error editing the item");
      });
  };

  const handleDeleteConfirm = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`/manager/items/delete/${currentItem._id}/${token}`)
      .then((response) => {
        setIsDeleteModalOpen(false);
        toast.success(response.data.message);
        fetchItems();
      })
      .catch((error) => {
        console.error("Error deleting the item:", error);
        toast.error("Error deleting the item");
      });
  };

  const handleCreateSubmit = () => {
    if (newItem.name.length < 3 || newItem.description.length < 10) {
      toast.error(
        "Name should be at least 3 characters and description at least 10 characters"
      );
      return;
    }
    axios
      .post("/manager/items/create", newItem)
      .then((response) => {
        setIsCreateModalOpen(false);
        toast.success("Item created successfully!");
        fetchItems();
      })
      .catch((error) => {
        console.error("Error creating the item:", error);
        toast.error("Error creating the item");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Items</h1>
      <button
        className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create New Item
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={`http://localhost:3001` + item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-bold text-gray-800">${item.price}</p>
              <p className="font-bold text-gray-800">Stock: {item.stock}</p>
            </div>
            <div className="flex gap-4 p-2">
              <button
                className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleEditClick(item)}
              >
                <i className="bi bi-pencil mr-2"></i>Edit
              </button>
              <button
                className="flex items-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => handleDeleteClick(item)}
              >
                <i className="bi bi-trash mr-2"></i>Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCreateModalOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div
            className="rounded-lg bg-white p-6 shadow-lg"
            style={{ width: 400 + "px" }}
          >
            <h2 className="mb-4 text-xl font-bold">Create New Item</h2>
            <p className="mb-4 text-sm text-gray-500">Item Name</p>
            <input
              type="text"
              className="mb-4 w-full border p-2"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <p className="mb-4 text-sm text-gray-500">Item Description</p>
            <input
              type="text"
              className="mb-4 w-full border p-2"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <p className="mb-4 text-sm text-gray-500">Item Price</p>
            <input
              type="number"
              className="mb-4 w-full border p-2"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <p className="mb-4 text-sm text-gray-500">Stock</p>
            <input
              type="number"
              className="mb-4 w-full border p-2"
              placeholder="Stock"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({ ...newItem, stock: e.target.value })
              }
              required
            />
            <p className="mb-4 text-sm text-gray-500">Category</p>
            <select
              className="mb-4 w-full border p-2"
              value={newItem.categoryId}
              onChange={(e) =>
                setNewItem({ ...newItem, categoryId: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.length === 0 ? (
                <option disabled>No categories available</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <p className="mb-4 text-sm text-gray-500">Item Image</p>
            <input
              type="file"
              className="mb-4 w-full border p-2"
              onChange={handleImageChange}
            />
            {newItem.image && (
              <img
                src={newItem.image}
                alt="Preview"
                className="mb-4 h-32 w-full object-cover"
              />
            )}
            <div className="flex justify-end gap-4">
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={handleCreateSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div
            className="rounded-lg bg-white p-6 shadow-lg"
            style={{ width: 400 + "px" }}
          >
            <h2 className="mb-4 text-xl font-bold">Edit Item</h2>
            <p className="mb-4 text-sm text-gray-500">Item Name</p>
            <input
              type="text"
              className="mb-4 w-full border p-2"
              placeholder="Name"
              value={currentItem.name}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, name: e.target.value })
              }
            />
            <p className="mb-4 text-sm text-gray-500">Item Description</p>
            <input
              type="text"
              className="mb-4 w-full border p-2"
              placeholder="Description"
              value={currentItem.description}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, description: e.target.value })
              }
            />
            <p className="mb-4 text-sm text-gray-500">Item Price</p>
            <input
              type="number"
              className="mb-4 w-full border p-2"
              placeholder="Price"
              value={currentItem.price}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, price: e.target.value })
              }
            />
            <p className="mb-4 text-sm text-gray-500">Stock</p>
            <input
              type="number"
              className="mb-4 w-full border p-2"
              placeholder="Stock"
              value={currentItem.stock}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, stock: e.target.value })
              }
              required
            />
            <p className="mb-4 text-sm text-gray-500">Category</p>
            <select
              className="mb-4 w-full border p-2"
              value={currentItem.categoryId}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.length === 0 ? (
                <option disabled>No categories available</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <p className="mb-4 text-sm text-gray-500">Item Image</p>
            <input
              type="file"
              className="mb-4 w-full border p-2"
              onChange={handleEditImageChange}
            />
            {currentItem.image && (
              <img
                src={currentItem.image}
                alt="Preview"
                className="mb-4 h-32 w-full object-cover"
              />
            )}
            <div className="flex justify-end gap-4"></div>
            <button
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => handleEditSubmit(currentItem)}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Items;
