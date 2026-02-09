import "./Header.css";

import bell from "../../assets/icons/ui/bell.png";
import settings from "../../assets/icons/ui/settings.png";

export default function Header() {
  return (
    <header className="header">
      <div className="headerLeft">
        <div className="hi">Hi</div>
        <div className="name">Naïma</div>
      </div>

      <div className="headerRight">
        <button className="iconBtn" type="button" aria-label="Notifications">
          <img src={bell} alt="" />
        </button>
        <button className="iconBtn" type="button" aria-label="Settings">
          <img src={settings} alt="" />
        </button>
      </div>
    </header>
  );
}
