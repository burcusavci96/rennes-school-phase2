import { events } from "../../data/dashboard";
import "./EventsPanel.css";

export default function EventsPanel() {
  return (
    <div className="eventsWrap">
      <div className="eventsTop">
        <div className="tabs">
          <button className="tab active">Events</button>
          <button className="tab">News</button>
        </div>
        <button className="seeAll">See All</button>
      </div>

      <div className="eventsList">
        {events.map((e, idx) => (
          <article key={idx} className="eventCard">
            <div className="eventImage" />
            <div className="eventGradient" />
            <div className="eventInner">
              <div className="eventTitle">{e.title}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}