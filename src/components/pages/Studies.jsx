import "./Studies.css";

function Panel({ title, subtitle, children }) {
  return (
    <section className="studPanel">
      <div className="studPanelHead">
        <div className="studPanelTitle">{title}</div>
        <div className="studPanelSub">{subtitle}</div>
      </div>
      {children}
    </section>
  );
}

function EmptyCard({ title, description }) {
  return (
    <div className="studEmptyCard">
      <div className="studEmptyTitle">{title}</div>
      <div className="studEmptyDesc">{description}</div>
    </div>
  );
}

export default function Studies() {
  return (
    <div className="pageShell">
      <h1 className="pageTitle">Studies</h1>

      <div className="studGrid">
        <Panel title="My courses" subtitle="Overview of your current modules.">
          <EmptyCard
            title="No data yet"
            description="This section will show your courses and materials."
          />
        </Panel>

        <Panel title="Assignments" subtitle="Upcoming tasks and deadlines.">
          <EmptyCard
            title="Nothing scheduled"
            description="Assignments will appear here when available."
          />
        </Panel>
      </div>
    </div>
  );
}