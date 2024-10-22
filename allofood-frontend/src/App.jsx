//App.jsx
import React from "react";
import RouterComponent from "./router";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import AddRestaurant from "views/superadmin/Restaurants/AddRestaurant";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/add-restaurant" element={<AddRestaurant />} />
    </Routes>
  );
};

export default App;