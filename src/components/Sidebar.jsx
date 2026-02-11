import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => (isActive ? "navItem isActive" : "navItem");

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <nav className="sidebar__nav" aria-label="Primary">
        <NavLink className={linkClass} to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink className={linkClass} to="/schedule">
          Schedule
        </NavLink>

        <NavLink className={linkClass} to="/studies">
          Studies
        </NavLink>

        <NavLink className={linkClass} to="/help">
          Help
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