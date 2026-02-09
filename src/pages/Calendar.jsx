import Sidebar from "../components/Sidebar.jsx";
import BottomTabbar from "../components/BottomTabbar.jsx";

export default function Calendar() {
  return (
    <div className="appShell">
      <Sidebar />
      <main className="main">
        <h1 className="pageTitle">Calendar</h1>
        <div className="card">Buraya calendar grid’i koyacağız.</div>
      </main>
      <BottomTabbar />
    </div>
  );
}