import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <NavLink className="navItem" to="/">
          Dashboard
        </NavLink>

        <NavLink className="navItem" to="/calendar">
          Calendar
        </NavLink>
      </nav>

      <div className="sidebar__bottom">
        <button className="navItem navItem--ghost" type="button">
          Log out
        </button>
      </div>
    </aside>
  );
}