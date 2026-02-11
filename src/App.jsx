// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./components/dashboard/Dashboard";
import News from "./components/news/News";
import Schedule from "./components/schedule/Schedule";

import Studies from "./components/pages/Studies";
import Help from "./components/pages/Help";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<News />} />
        <Route path="/schedule" element={<Schedule />} />

        <Route path="/studies" element={<Studies />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
}