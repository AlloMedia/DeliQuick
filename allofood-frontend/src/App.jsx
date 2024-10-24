//App.jsx
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import Router from "./router";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;