// src/components/layout/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="appShell">
      <Sidebar />
      <div className="appMain">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}