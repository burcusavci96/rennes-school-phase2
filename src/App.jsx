import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./components/dashboard/Dashboard";
import News from "./components/news/News";
import Schedule from "./components/schedule/Schedule";




function Studies() {
  return <div style={{ padding: 8 }}>Studies page</div>;
}
function Help() {
  return <div style={{ padding: 8 }}>Help page</div>;
}

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
