import { useState } from "react";
import "./WelcomeCard.css";

export default function WelcomeCard() {
  const [open, setOpen] = useState(true);

  
  if (!open) {
    return (
      <button
        type="button"
        className="welcomeReopen"
        onClick={() => setOpen(true)}
        aria-label="Open welcome card"
      >
        Open welcome
      </button>
    );
  }

  return (
    <div className="welcome">
      <div className="welcomeTop">
        <h3>Welcome to Rennes School of Business</h3>

        <button
          className="close"
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
          }}
        >
          ✕
        </button>
      </div>

      <p>
        We are delighted to welcome you to this space dedicated to your academic
        and personal success…
      </p>

      <div className="welcomeBtns">
        <button type="button" className="pill">Campus map</button>
        <button type="button" className="pill">School services</button>
      </div>
    </div>
  );
}
