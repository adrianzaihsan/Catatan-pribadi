import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import AddNotePage from "../pages/AddNotePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ArchivedPage from "../pages/ArchivedPage";
import { AuthContext } from "../contexts/AuthContext";

function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/archives"
        element={user ? <ArchivedPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/notes/add"
        element={user ? <AddNotePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/notes/:id"
        element={user ? <DetailPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default AppRouter;
