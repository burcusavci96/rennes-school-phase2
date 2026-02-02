export default function WelcomeCard({ onClose }) {
  return (
    <section className="card cardPad">
      <div className="welcomeTop">
        <div className="welcomeTitle">Welcome to Rennes School of Business</div>

        <button
          className="iconBtn iconBtn--sm"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <p className="welcomeText">
        We are delighted to welcome you to this space dedicated to your academic and personal success...
      </p>

      <div className="pillRow">
        <span className="pill">Campus map</span>
        <span className="pill">School services</span>
      </div>
    </section>
  );
}