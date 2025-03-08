import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ExercisePage from "../pages/ExercisePage";
import NutritionPage from "../pages/NutritionPage";
import AIChatPage from "../pages/AIChatPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import ContactUs from "../pages/ContactUs";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/ai-chat" element={<AIChatPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
