import { NavLink } from "react-router-dom";

export default function BottomTabbar() {
  return (
    <nav className="tabbar" aria-label="Bottom navigation">
      <NavLink className="tabItem" to="/">
        Dashboard
      </NavLink>
      <NavLink className="tabItem" to="/calendar">
        Calendar
      </NavLink>
    </nav>
  );
}