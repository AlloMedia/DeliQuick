import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/dashboard";
import { filterRoutesByRole } from "../utils/routeUtils";
import { useAuth } from "../context/auth/AuthContext";
import allRoutes from "../constants/sidebarNavigation";
import ProtectedRoute from "../components/ProtectedRoute";
import AddRestaurant from "../views/superadmin/Restaurants/AddRestaurant";
import EditRestaurant from "views/superadmin/Restaurants/EditRestaurant";
import DetailRestaurant from "views/superadmin/Restaurants/DetailRestaurant";

import Register from "../views/auth/register";
import Login from "../views/auth/login";
import OtpVerification from "../views/auth/otp-verification";
import ForgotPassword from "../views/auth/forgot-password";
import ResetPassword from "../views/auth/reset-password";
import NotFound from "../views/errors/404-error";
import RoleSelection from "../components/auth/RoleSelection";
import PublicRoute from "../components/auth/PublicRoute";
import Index from "../views";
import HomeLayout from "../layouts/home";
import RestaurantsSection from "../components/restaurants/RestaurantCard"; // Update this path accordingly
import RestaurantDetails from "../components/restaurants/RestaurantDetails"; 


const Router = () => {
  const { user, isLoading } = useAuth();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (user && user.role) {
      const filteredRoutes = filterRoutesByRole(allRoutes, user.role);
      setRoutes(filteredRoutes);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Protected Dashboard Routes */}
      {user && user.role && (
        <Route path={`/${user.role.toLowerCase()}`} element={<Layout />}>
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
      )}

      {/* Public Routes */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Index />} />
        <Route
          path="/role-selection"
          element={
            <PublicRoute>
              <RoleSelection />
            </PublicRoute>
          }
        />
        <Route
          path="/otp-verification"
          element={
            <PublicRoute>
              <OtpVerification />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Auth Routes */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Root redirect for authenticated users */}
      {user && user.role && (
        <Route
          path="/"
          element={<Navigate to={`/${user.role.toLowerCase()}`} replace />}
        />
      )}

      {/* Restaurant Management Routes */}
      <Route path="/add-restaurant" element={<AddRestaurant />} />
      <Route path="/edit-restaurant/:restaurantId" element={<EditRestaurant />} />
      <Route path="/restaurants/:id" element={<RestaurantDetails />} />
      {/* RestaurantsSection should be inside the appropriate layout or path, e.g. */}
      <Route path={`/${user.role.toLowerCase()}/restaurants`} element={<RestaurantsSection />} />
      <Route path="/" element={<RestaurantsSection />} />
      <Route path="/restaurants/:id" element={<RestaurantDetails />} />
      <Route path="/restaurant-details/:restaurantId" element={<DetailRestaurant />} />
      <Route path="/restaurants/:id" element={<RestaurantDetails />} />
      {/* RestaurantsSection should be inside the appropriate layout or path, e.g. */}
      <Route path={`/${user.role.toLowerCase()}/restaurants`} element={<RestaurantsSection />} />
      {/* Catch all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export default Router;