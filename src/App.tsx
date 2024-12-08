import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import { ROUTES } from "./constants/routes";

const { LOGIN, HOME, SIGN_UP, SUBSCRIPTION } = ROUTES;

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Return true if the token exists
};

// Auth Guard Component
const AuthGuard = ({ children }: { children: React.ReactElement }) => {
  return isAuthenticated() ? children : <Navigate to={LOGIN} />;
};

const AppRoutes = () => {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGN_UP} element={<Signup />} />

        {/* Protected Route */}
        <Route
          path={HOME}
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path={SUBSCRIPTION}
          element={
            <AuthGuard>
              <Subscription />
            </AuthGuard>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={LOGIN} />} />
      </Routes>
  );
};

export default AppRoutes;
