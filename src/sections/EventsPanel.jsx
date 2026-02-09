import "./EventsPanel.css";
import { events } from "../data/dashboard";
import { NavLink } from "react-router-dom";

export default function EventsPanel() {
  return (
    <section className="events">
      {/* ÜST HEADER: Events / News + See All */}
      <div className="eventsHeader">
        <div className="tabs">
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
        </div>

        <button className="seeAll" type="button">
          See All
        </button>
      </div>

      {/* BANNER LİSTESİ */}
      <div className="eventsList">
        {events.map((e, i) => (
          <article className={`bannerCard pos-${i}`} key={i}>
            <img className="bannerImg" src={e.image} alt={e.title} />

            {/* FOTOĞRAF ÜSTÜ YAZI KATMANI (overlay) */}
            <div className="bannerOverlay">
              <div className="bannerTitle">{e.title}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}