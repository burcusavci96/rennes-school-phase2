import { scheduleNext, scheduleDomain } from "../../data/dashboard";
import "./ScheduleList.css";

function Card({ item, accent = "pink" }) {
  return (
    <div className="schCard">
      <div className={`schDate ${accent}`}>
        <div className="schDay">{item.day}</div>
        <div className="schNum">{item.date}</div>
      </div>

      <div className="schInfo">
        <div className="schTitle">{item.title}</div>
        <div className="schMeta">
          <span>📍 {item.group}</span>
          <span>•</span>
          <span>{item.room}</span>
        </div>
        <div className="schTime">⏱ {item.time}</div>
      </div>

      <div className="schDur">{item.duration}</div>
    </div>
  );
}

export default function ScheduleList() {
  return (
    <div className="scheduleBlock">
      <h3 className="blockTitle">Next course</h3>
      <div className="blockStack">
        {scheduleNext.map((it, idx) => (
          <Card key={idx} item={it} accent={idx === 0 ? "pink" : "blue"} />
        ))}
      </div>

      <div className="dividerLabel">Domain</div>

      <div className="blockStack">
        {scheduleDomain.map((it, idx) => (
          <Card key={idx} item={it} accent={idx === 0 ? "green" : "green"} />
        ))}
      </div>
    </div>
  );
}