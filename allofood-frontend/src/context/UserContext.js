import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the user role from an API or local storage
    const fetchUserRole = async () => {
      // Replace with actual API call or local storage retrieval
      const role = await getUserRoleFromAPI();
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={userRole}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Mock function to simulate fetching user role from an API
const getUserRoleFromAPI = async () => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('delivery');
    }, 1000);
  });
};