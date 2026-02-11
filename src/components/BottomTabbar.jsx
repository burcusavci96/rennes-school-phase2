import { NavLink } from "react-router-dom";

const tabClass = ({ isActive }) => (isActive ? "tabItem isActive" : "tabItem");

export default function BottomTabbar() {
  return (
    <nav className="tabbar" aria-label="Bottom navigation">
      <NavLink className={tabClass} to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink className={tabClass} to="/schedule">
        Schedule
      </NavLink>

      <NavLink className={tabClass} to="/studies">
        Studies
      </NavLink>

      <NavLink className={tabClass} to="/help">
        Help
      </NavLink>
    </nav>
  );
}