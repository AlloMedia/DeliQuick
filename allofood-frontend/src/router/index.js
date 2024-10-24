import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/dashboard";
import { filterRoutesByRole } from "../utils/routeUtils";
import { useUser } from "../context/UserContext";
import allRoutes from "../constants/sidebarNavigation";
import ProtectedRoute from "../components/ProtectedRoute";
import AddRestaurant from "../views/superadmin/Restaurants/AddRestaurant";
import EditRestaurant from "views/superadmin/Restaurants/EditRestaurant";

const RouterComponent = () => {
  const userRole = useUser();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (userRole) {
      const filteredRoutes = filterRoutesByRole(allRoutes, userRole);
      setRoutes(filteredRoutes);
    }
  }, [userRole]);

  if (!userRole) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Base route with role */}
      <Route path={`/${userRole.toLowerCase()}`} element={<Layout />}>
        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Dynamic routes based on user role */}
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute Component={route.component} roles={route.roles} />
            }
          />
        ))}
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={<Navigate to={`/${userRole.toLowerCase()}`} replace />}
      />

      <Route path="/add-restaurant" element={<AddRestaurant />} />
      <Route path="/edit-restaurant/:restaurantId" element={<EditRestaurant />} />


      {/* Catch all route for 404 */}
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
};

export default RouterComponent;
