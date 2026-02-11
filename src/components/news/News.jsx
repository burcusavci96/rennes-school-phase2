// src/components/news/News.jsx
import "./News.css";

import event1 from "../../assets/banners/event-1.png";
import event2 from "../../assets/banners/event-2.png";
import event3 from "../../assets/banners/event-3.png";

const NEWS_ITEMS = [
  {
    id: 1,
    title: "Journée Portes Ouvertes",
    meta: "Campus • 20 Feb 2026",
    image: event1,
  },
  {
    id: 2,
    title: "Retour sur le Marathon Vert 2024",
    meta: "Highlights • 12 Feb 2026",
    image: event2,
  },
  {
    id: 3,
    title: "Junior Comex: students join the executive board",
    meta: "Student life • 09 Feb 2026",
    image: event3,
  },
];

export default function News() {
  return (
    <div className="dashPanel newsPanel">
      <div className="panelTop">
        <div className="tabs" role="tablist" aria-label="Dashboard feed">
          <a className="tab" href="/dashboard">
            Events
          </a>
          <a className="tab tab--active" href="/news" aria-current="page">
            News
          </a>
        </div>

        <a className="seeAll" href="/dashboard">
          Back
        </a>
      </div>

      <div className="newsList">
        {NEWS_ITEMS.map((item) => (
          <article key={item.id} className="newsCard">
            <img className="newsImg" src={item.image} alt={item.title} loading="lazy" />
            <div className="newsBody">
              <div className="newsTitle">{item.title}</div>
              <div className="newsMeta">{item.meta}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}