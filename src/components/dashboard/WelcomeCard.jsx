import "./WelcomeCard.css";

export default function WelcomeCard() {
  return (
    <div className="welcomeCard">
      <div className="welcomeHead">
        <h3>Welcome to Rennes School of Business</h3>
        <button className="closeBtn" aria-label="Close">✕</button>
      </div>

      <p className="welcomeText">
        We are delighted to welcome you to this space dedicated to your academic and personal success…
      </p>

      <div className="welcomeActions">
        <button className="pill">Campus map</button>
        <button className="pill">School services</button>
      </div>
    </div>
  );
}