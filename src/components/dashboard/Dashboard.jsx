import "./Dashboard.css";
import ScheduleList from "../../sections/ScheduleList";
import EventsPanel from "../../sections/EventsPanel";
import WelcomeCard from "../../sections/WelcomeCard";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="col-left">
        <ScheduleList />
      </div>

      <div className="col-mid">
        <EventsPanel />
      </div>

      <div className="col-right">
        <WelcomeCard />
      </div>
    </div>
  );
}
