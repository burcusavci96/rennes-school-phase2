import "./EventsPanel.css";
import { events } from "../data/dashboard";
import { NavLink, useNavigate } from "react-router-dom";

export default function EventsPanel() {
  const navigate = useNavigate();

  return (
    <section className="events" aria-label="Events and news">
      <div className="eventsHeader">
        <nav className="tabs" aria-label="Dashboard feed tabs">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? "tab active" : "tab")}
          >
            Events
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) => (isActive ? "tab active" : "tab")}
          >
            News
          </NavLink>
        </nav>

        <button
          className="seeAll"
          type="button"
          onClick={() => navigate("/news")}
          aria-label="See all news"
        >
          See All
        </button>
      </div>

      <div className="eventsList">
        {events.map((e, i) => (
          <article className={`bannerCard pos-${i}`} key={e.id ?? `${e.title}-${i}`}>
            <img className="bannerImg" src={e.image} alt={e.title} loading="lazy" />

            <div className="bannerOverlay" aria-hidden="true">
              <div className="bannerTitle">{e.title}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}