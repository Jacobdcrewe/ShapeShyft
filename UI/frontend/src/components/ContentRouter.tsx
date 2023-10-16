import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./pages/UserLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import FoodAndCalories from "./pages/user/FoodAndCalories";
import Exercise from "./pages/user/Exercise";
import HealthAndWellness from "./pages/user/HealthAndWellness";
import Recipes from "./pages/user/Recipes";

export function ContentRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="user" element={<UserLayout />}>
          <Route path="*" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="food-and-calories" element={<FoodAndCalories />} />
          <Route path="exercise" element={<Exercise />} />
          <Route path="health-and-wellness" element={<HealthAndWellness />} />
          <Route path="recipes" element={<Recipes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ContentRouter;
