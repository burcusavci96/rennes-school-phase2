import "./Help.css";

function HelpCard({ title, description, href = "#" }) {
  return (
    <a className="helpCard" href={href} role="button">
      <div className="helpCardTitle">{title}</div>
      <div className="helpCardDesc">{description}</div>
    </a>
  );
}

export default function Help() {
  return (
    <div className="pageShell">
      <h1 className="pageTitle">Help</h1>

      <section className="helpPanel">
        <div className="helpPanelHead">
          <div className="helpPanelTitle">Need assistance?</div>
          <div className="helpPanelSub">Find quick answers and contact options.</div>
        </div>

        <div className="helpList">
          <HelpCard title="FAQ" description="Common questions" />
          <HelpCard title="Contact support" description="Open a ticket" />
          <HelpCard title="Campus map" description="Find rooms & buildings" />
        </div>
      </section>
    </div>
  );
}