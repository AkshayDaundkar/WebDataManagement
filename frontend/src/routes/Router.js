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
import GroupChat from "../pages/GroupChat";
import AboutUs from "./../pages/AboutUs";
import FAQ from "../pages/Faq";
import LandingPage from "../pages/LandingPage";
import ForgetPasswordPage from "../pages/ForgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/ai-chat" element={<AIChatPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/chat" element={<GroupChat />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
