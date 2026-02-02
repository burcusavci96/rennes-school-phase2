import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import BottomTabbar from "../components/BottomTabbar.jsx";
import WelcomeCard from "../components/WelcomeCard.jsx";

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="appShell">
      <Sidebar />

      <main className="main">
        <div className="topRow">
          <div className="pageHeading">
            <div className="avatarDot" />
            <div>
              <div className="hello">Hi</div>
              <div className="name">Naïma !</div>
            </div>
          </div>

          <div className="topIcons">
            <button className="iconSquare" type="button" aria-label="Notifications" />
            <button className="iconSquare" type="button" aria-label="Settings" />
          </div>
        </div>

        <section className="dashGrid">
          {/* Sol kolon */}
          <div className="colLeft">
            <div className="panelTitle">Next course</div>

            <div className="courseList">
              <article className="courseCard">
                <div className="datePill datePill--pink">
                  <div className="dateDay">Tue</div>
                  <div className="dateNum">16</div>
                </div>

                <div className="courseInfo">
                  <div className="courseTop">
                    <div className="courseName">Stellar Physics</div>
                    <div className="courseDur">2h.</div>
                  </div>
                  <div className="courseMeta">Bat. B • Salle 12</div>
                  <div className="courseTime">9:30 AM — 11:30 AM</div>
                </div>
              </article>

              <article className="courseCard">
                <div className="datePill datePill--blue">
                  <div className="dateDay">Tue</div>
                  <div className="dateNum">16</div>
                </div>

                <div className="courseInfo">
                  <div className="courseTop">
                    <div className="courseName">Stellar Physics</div>
                    <div className="courseDur">2h.</div>
                  </div>
                  <div className="courseMeta">Bat. B • Salle 12</div>
                  <div className="courseTime">3 PM — 5 PM</div>
                </div>
              </article>
            </div>

            <div className="dividerLabel">Demain</div>

            <div className="courseList">
              <article className="courseCard">
                <div className="datePill datePill--green">
                  <div className="dateDay">Wed</div>
                  <div className="dateNum">17</div>
                </div>

                <div className="courseInfo">
                  <div className="courseTop">
                    <div className="courseName">Business Analytics</div>
                    <div className="courseDur">2h.</div>
                  </div>
                  <div className="courseMeta">Bat. B • Salle 12</div>
                  <div className="courseTime">9:30 AM — 11:30 AM</div>
                </div>
              </article>

              <article className="courseCard">
                <div className="datePill datePill--green">
                  <div className="dateDay">Wed</div>
                  <div className="dateNum">17</div>
                </div>

                <div className="courseInfo">
                  <div className="courseTop">
                    <div className="courseName">Change Management</div>
                    <div className="courseDur">2h.</div>
                  </div>
                  <div className="courseMeta">Bat. B • Salle 12</div>
                  <div className="courseTime">2 PM — 4 PM</div>
                </div>
              </article>
            </div>
          </div>

          {/* Orta kolon */}
          <div className="colMid">
            <div className="tabsRow">
              <div className="tabs">
                <button className="tab tab--active" type="button">Events</button>
                <button className="tab" type="button">News</button>
              </div>
              <a className="seeAll" href="#">See All</a>
            </div>

           <div className="bannerStack">
  <article className="bannerCard">
    <img className="bannerImg" src="/banners/banner-1.png" alt="Banner 1" />
    <div className="bannerOverlay">
      <div className="bannerTitle">JOURNÉE PORTES OUVERTES</div>
    </div>
  </article>

  <article className="bannerCard">
    <img className="bannerImg" src="/banners/banner-2.png" alt="Banner 2" />
    <div className="bannerOverlay">
      <div className="bannerTitle">RETOUR SUR LE MARATHON VERT 2024</div>
    </div>
  </article>

  <article className="bannerCard">
    <img className="bannerImg" src="/banners/banner-3.png" alt="Banner 3" />
    <div className="bannerOverlay">
      <div className="bannerTitle">
        JUNIOR COMEX : DES ÉTUDIANTS INTÈGRENT LE COMEX DE RENNES SCHOOL OF BUSINESS
      </div>
    </div>
  </article>
</div>
          </div>

          {/* Sağ kolon */}
          <div className="colRight">
            {showWelcome && (
              <WelcomeCard onClose={() => setShowWelcome(false)} />
            )}
          </div>
        </section>
      </main>

      <BottomTabbar />
    </div>
  );
}