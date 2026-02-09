import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import logo from "../../assets/logo/logo.png";

import dash from "../../assets/icons/sidebar/dashboard.png";
import dashA from "../../assets/icons/sidebar/dashboard-active.png";

import sch from "../../assets/icons/sidebar/schedule.png";
import schA from "../../assets/icons/sidebar/schedule-active.png";

import stu from "../../assets/icons/sidebar/studies.png";
import help from "../../assets/icons/sidebar/help.png";
import icLogout from "../../assets/icons/sidebar/logout.png";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: dash, iconActive: dashA },
  { to: "/schedule", label: "Schedule", icon: sch, iconActive: schA },

  { to: "/studies", label: "Studies", icon: stu, iconActive: stu },
  { to: "/help", label: "Help", icon: help, iconActive: help },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="brandLogo" src={logo} alt="Logo" />
      </div>

      <nav className="nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
          >
            {({ isActive }) => (
              <>
                <img
                  className="navIcon"
                  src={isActive ? it.iconActive : it.icon}
                  alt=""
                />
                <div className="navText">{it.label}</div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button className="logoutBtn" type="button">
        <img className="navIcon" src={icLogout} alt="" />
        <div className="navText">Logout</div>
      </button>
    </aside>
  );
}
