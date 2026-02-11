import { useEffect, useState } from "react";
import "./ScheduleList.css";
import { scheduleNext, scheduleDomain } from "../data/dashboard";

import icLocation from "../assets/icons/schedule/location.png";
import icClock from "../assets/icons/schedule/clock.png";

function TimeRow({ time }) {
  return (
    <div className="timeOneLine">
      <img src={icClock} alt="" />
      <span>{time}</span>
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="scheduleCard">
      <div className={`dateBox ${item.color || ""}`}>
        <div className="day">{item.day}</div>
        <div className="date">{item.date}</div>
      </div>

      <div className="info">
        <div className="course">{item.course}</div>

        <div className="meta">
          <span className="badgeWithIcon">
            <img src={icLocation} alt="" />
            {item.location}
          </span>

          <span className="badgeNoIcon">{item.room}</span>
        </div>

        <TimeRow time={item.time} />
      </div>

      <div className="duration">{item.duration}</div>
    </div>
  );
}

export default function ScheduleList() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);

    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const nextItems = isMobile ? scheduleNext.slice(0, 1) : scheduleNext;

  return (
    <section className="scheduleWrap">
      <h3 className="title">Next course</h3>

      <div className="list">
        {nextItems.map((item, i) => (
          <Card item={item} key={`next-${i}`} />
        ))}
      </div>

    
      {!isMobile && (
        <>
          <div className="domainTitle">Demain</div>
          <div className="list">
            {scheduleDomain.map((item, i) => (
              <Card item={item} key={`dom-${i}`} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
