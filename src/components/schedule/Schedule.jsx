// src/components/schedule/Schedule.jsx
import { useEffect, useMemo, useState } from "react";
import "./Schedule.css";
import { scheduleItems } from "../../data/schedule";

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function useNow(tickMs = 30000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);
  return now;
}

// ---------- helpers ----------
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function startOfWeekMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun
  const diff = (day === 0 ? -6 : 1) - day; // to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toLocalISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseTimeToMinutes24(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function formatHourLabel(h) {
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh} ${ap}`;
}

function formatShortDate(d) {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatWeekRange(startDate) {
  const start = new Date(startDate);
  const end = addDays(start, 4); // Mon–Fri

  const startPart = start.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const endPart = end.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${startPart} - ${endPart}`;
}

/**
 * Mobile default:
 * - weekday => today
 * - weekend => next Monday
 */
function getMobileDefaultDate() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);

  const day = t.getDay(); // 0 Sun, 6 Sat
  const isWeekend = day === 0 || day === 6;
  if (!isWeekend) return t;

  const daysToNextMonday = day === 0 ? 1 : 2;
  const nextMon = new Date(t);
  nextMon.setDate(nextMon.getDate() + daysToNextMonday);
  nextMon.setHours(0, 0, 0, 0);
  return nextMon;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width:${breakpoint}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", onChange);
    mq.addListener?.(onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      mq.removeListener?.(onChange);
    };
  }, [breakpoint]);

  return isMobile;
}

// ---------- UI pieces ----------
function ViewTabs({ view, onChange }) {
  return (
    <div className="schedViewTabs" role="tablist" aria-label="Schedule view">
      <button
        type="button"
        className={view === "day" ? "schedTab active" : "schedTab"}
        onClick={() => onChange("day")}
      >
        Day
      </button>
      <button
        type="button"
        className={view === "week" ? "schedTab active" : "schedTab"}
        onClick={() => onChange("week")}
      >
        Week
      </button>
      <button
        type="button"
        className={view === "month" ? "schedTab active" : "schedTab"}
        onClick={() => onChange("month")}
      >
        Month
      </button>
    </div>
  );
}

/**
 * MONTH GRID (Monday-first)
 */
function MonthGrid({ cursorDate, selectedDate, onPickDate, events }) {
  const y = cursorDate.getFullYear();
  const m = cursorDate.getMonth();

  const daysInMonth = new Date(y, m + 1, 0).getDate();

  // JS getDay(): 0=Sun ... 6=Sat
  // Convert to Monday-first index: Mon=0 ... Sun=6
  const firstDowSundayFirst = new Date(y, m, 1).getDay();
  const firstDowMondayFirst = (firstDowSundayFirst + 6) % 7;

  const lastDowSundayFirst = new Date(y, m, daysInMonth).getDay();
  const lastDowMondayFirst = (lastDowSundayFirst + 6) % 7;

  const trailing = 6 - lastDowMondayFirst;

  const cells = [];
  for (let i = 0; i < firstDowMondayFirst; i++) {
    cells.push({ kind: "empty", key: `e-${i}` });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    date.setHours(0, 0, 0, 0);
    cells.push({ kind: "day", date, iso: toLocalISO(date), muted: false, key: `c-${d}` });
  }

  for (let d = 1; d <= trailing; d++) {
    const date = new Date(y, m + 1, d);
    date.setHours(0, 0, 0, 0);
    cells.push({ kind: "day", date, iso: toLocalISO(date), muted: true, key: `n-${d}` });
  }

  const eventsByIso = useMemo(() => {
    const map = new Map();
    for (const e of events) {
      if (!map.has(e.dateIso)) map.set(e.dateIso, []);
      map.get(e.dateIso).push(e);
    }
    for (const [, arr] of map.entries()) arr.sort((a, b) => a.startMin - b.startMin);
    return map;
  }, [events]);

  return (
    <div className="monthWrap">
      <div className="monthDowRow">
        {DOW.map((d) => (
          <div key={d} className="monthDowCell">{d}</div>
        ))}
      </div>

      <div className="monthGrid">
        {cells.map((c) => {
          if (c.kind === "empty") return <div key={c.key} className="monthDay muted" aria-hidden="true" />;

          const dayEvents = eventsByIso.get(c.iso) || [];
          const shown = dayEvents.slice(0, 2);
          const more = dayEvents.length - shown.length;

          return (
            <button
              key={c.key}
              type="button"
              className={[
                "monthDay",
                c.muted ? "muted" : "",
                sameDay(c.date, selectedDate) ? "active" : "",
              ].join(" ").trim()}
              onClick={() => onPickDate(c.date)}
            >
              <div className="monthDayTop">
                <div className="monthDayNum">{c.date.getDate()}</div>
              </div>

              <div className="monthItems">
                {shown.map((e) => (
                  <div
                    key={e.id}
                    className={e.cancelled ? "monthItem cancelled" : "monthItem"}
                    title={`${e.title} ${e.start}–${e.end}`}
                  >
                    <div className="monthItemTime">{e.start}–{e.end}</div>
                    <div className="monthItemTitle">{e.title}</div>
                  </div>
                ))}

                {more > 0 && (
                  <div className="monthDots" aria-label={`${more} more courses`}>
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * DESKTOP WEEK GRID
 */
function WeekGrid({ weekStart, selectedDate, onSelectDate, onOpenDay, events, now }) {
  const START_HOUR = 9;
  const END_HOUR = 18;
  const MINUTES = (END_HOUR - START_HOUR) * 60;

  const PX_PER_MIN = 1.2;
  const gridHeight = MINUTES * PX_PER_MIN;

  const MIN_EVENT_H = 56;
  const COMPACT_LIMIT = 78;

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const d of days) map.set(toLocalISO(d), []);
    for (const e of events) if (map.has(e.dateIso)) map.get(e.dateIso).push(e);
    for (const [, arr] of map.entries()) arr.sort((a, b) => a.startMin - b.startMin);
    return map;
  }, [days, events]);

  const hours = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) hours.push(h);

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const topNow = clamp((nowMin - START_HOUR * 60) * PX_PER_MIN, 0, gridHeight - 1);

  return (
    <div className="weekWrap">
      <div className="weekHeaderRow">
        <div className="timeHeaderCell" />
        {days.map((d) => (
          <button
            key={toLocalISO(d)}
            type="button"
            className={sameDay(d, selectedDate) ? "dayHead active" : "dayHead"}
            onClick={() => { onSelectDate(d); onOpenDay?.(d); }}
          >
            {/* Map Sun-first getDay() into Mon-first labels */}
            <div className="dow">{DOW[(d.getDay() + 6) % 7]}</div>
            <div className="dom">{d.getDate()}</div>
          </button>
        ))}
      </div>

      <div className="weekBody">
        <div className="timeCol" style={{ height: gridHeight }}>
          {hours.map((h) => {
            const top = (h - START_HOUR) * 60 * PX_PER_MIN;
            return <div className="timeTick" key={h} style={{ top }}>{formatHourLabel(h)}</div>;
          })}
        </div>

        <div className="daysGrid" style={{ height: gridHeight }}>
          {hours.map((h) => {
            const top = (h - START_HOUR) * 60 * PX_PER_MIN;
            return <div className="hourLine" key={h} style={{ top }} />;
          })}

          <div className="nowLine" style={{ top: topNow }}>
            <span className="nowDot" />
          </div>

          {days.map((d) => {
            const key = toLocalISO(d);
            const dayEvents = eventsByDay.get(key) || [];

            return (
              <div className="dayCol" key={key}>
                {dayEvents.map((e) => {
                  const startOffsetMin = Math.max(0, e.startMin - START_HOUR * 60);
                  const endOffsetMin = Math.min(MINUTES, e.endMin - START_HOUR * 60);

                  const top = startOffsetMin * PX_PER_MIN;
                  const naturalH = (endOffsetMin - startOffsetMin) * PX_PER_MIN;
                  const height = Math.max(MIN_EVENT_H, naturalH);
                  const compact = height < COMPACT_LIMIT;

                  return (
                    <div
                      key={e.id}
                      className={["wkEvent", e.cancelled ? "cancelled" : "", compact ? "compact" : ""].join(" ").trim()}
                      style={{ top, height }}
                    >
                      <div className="wkTop">
                        <div className="wkTitle">{e.title}</div>
                        <div className="wkDur">{e.duration}</div>
                      </div>

                      <div className="wkBadges">
                        <span className="wkBadge">{e.location}</span>
                        <span className="wkBadge">{e.room}</span>
                      </div>

                      <div className="wkTime">{e.start} → {e.end}</div>
                      {e.cancelled && <span className="wkCancelled">Cancelled</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * MOBILE WEEK (timeline)
 */
function WeekMobile({ selectedDate, onSelectDate, eventsOfSelectedDay, weekStart, now }) {
  const START_HOUR = 9;
  const END_HOUR = 18;
  const MINUTES = (END_HOUR - START_HOUR) * 60;

  const PX_PER_MIN = 1.25;
  const gridHeight = MINUTES * PX_PER_MIN;

  const MIN_EVENT_H = 56;

  const hours = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) hours.push(h);

  const days = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)); // Mon–Fri

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const topNow = clamp((nowMin - START_HOUR * 60) * PX_PER_MIN, 0, gridHeight - 1);

  return (
    <div className="weekMobileWrap">
      <div className="weekMobileDays">
        {days.map((d) => {
          const active = sameDay(d, selectedDate);
          return (
            <button
              key={toLocalISO(d)}
              type="button"
              className={active ? "weekMobileDay active" : "weekMobileDay"}
              onClick={() => onSelectDate(d)}
            >
              <div className="wdDow">{DOW[(d.getDay() + 6) % 7]}</div>
              <div className="wdDom">{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      <div className="mDayBody">
        <div className="timeCol mTimeCol" style={{ height: gridHeight }}>
          {hours.map((h) => {
            const top = (h - START_HOUR) * 60 * PX_PER_MIN;
            return <div className="timeTick" key={h} style={{ top }}>{formatHourLabel(h)}</div>;
          })}
        </div>

        <div className="dayGrid mDayGrid" style={{ height: gridHeight }}>
          {hours.map((h) => {
            const top = (h - START_HOUR) * 60 * PX_PER_MIN;
            return <div className="hourLine" key={h} style={{ top }} />;
          })}

          <div className="nowLine" style={{ top: topNow }}>
            <span className="nowDot" />
          </div>

          <div className="dayCol single">
            {eventsOfSelectedDay.map((e) => {
              const startOffsetMin = Math.max(0, e.startMin - START_HOUR * 60);
              const endOffsetMin = Math.min(MINUTES, e.endMin - START_HOUR * 60);

              const top = startOffsetMin * PX_PER_MIN;
              const naturalH = (endOffsetMin - startOffsetMin) * PX_PER_MIN;
              const height = Math.max(MIN_EVENT_H, naturalH);

              return (
                <div
                  key={e.id}
                  className={["wkEvent", e.cancelled ? "cancelled" : ""].join(" ").trim()}
                  style={{ top, height }}
                >
                  <div className="wkTop">
                    <div className="wkTitle">{e.title}</div>
                    <div className="wkDur">{e.duration}</div>
                  </div>

                  <div className="wkBadges">
                    <span className="wkBadge">{e.location}</span>
                    <span className="wkBadge">{e.room}</span>
                  </div>

                  <div className="wkTime">{e.start} → {e.end}</div>
                  {e.cancelled && <span className="wkCancelled">Cancelled</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {eventsOfSelectedDay.length === 0 && (
        <div className="schedEmpty" style={{ paddingTop: 12 }}>
          No courses for this day.
        </div>
      )}
    </div>
  );
}

/**
 * DESKTOP DAY GRID
 */
function DayGrid({ date, events, now }) {
  const START_HOUR = 9;
  const END_HOUR = 18;
  const MINUTES = (END_HOUR - START_HOUR) * 60;

  const PX_PER_MIN = 1.3;
  const timeHeight = MINUTES * PX_PER_MIN;
  const gridHeight = timeHeight;

  const HOUR_PX = 60 * PX_PER_MIN;
  const MIN_EVENT_H = Math.max(56, Math.floor(HOUR_PX - 8));

  const hours = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) hours.push(h);

  const dayEvents = useMemo(() => {
    const iso = toLocalISO(date);
    return (events || []).filter((e) => e.dateIso === iso).sort((a, b) => a.startMin - b.startMin);
  }, [date, events]);

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const topNow = clamp((nowMin - START_HOUR * 60) * PX_PER_MIN, 0, gridHeight - 1);

  return (
    <div className="dayWrap">
      <div className="dayBody">
        <div className="timeCol" style={{ height: gridHeight }}>
          {hours.map((h) => {
            const top = (h - START_HOUR) * 60 * PX_PER_MIN;
            return <div className="timeTick" key={h} style={{ top }}>{formatHourLabel(h)}</div>;
          })}
        </div>

        <div className="dayGrid" style={{ height: gridHeight }}>
          {hours.map((h) => {
            const top = (h - START_HOUR) * 60 * PX_PER_MIN;
            return <div className="hourLine" key={h} style={{ top }} />;
          })}

          <div className="nowLine" style={{ top: topNow }}>
            <span className="nowDot" />
          </div>

          <div className="dayCol single">
            {dayEvents.map((e) => {
              const startOffsetMin = Math.max(0, e.startMin - START_HOUR * 60);
              const endOffsetMin = Math.min(MINUTES, e.endMin - START_HOUR * 60);

              const top = startOffsetMin * PX_PER_MIN;
              const naturalH = (endOffsetMin - startOffsetMin) * PX_PER_MIN;

              const desiredH = Math.max(MIN_EVENT_H, naturalH);
              const maxH = Math.max(24, timeHeight - top - 6);
              const height = Math.min(desiredH, maxH);

              return (
                <div
                  key={e.id}
                  className={["wkEvent", e.cancelled ? "cancelled" : ""].join(" ").trim()}
                  style={{ top, height }}
                >
                  <div className="wkTop">
                    <div className="wkTitle">{e.title}</div>
                    <div className="wkDur">{e.duration}</div>
                  </div>

                  <div className="wkBadges">
                    <span className="wkBadge">{e.location}</span>
                    <span className="wkBadge">{e.room}</span>
                  </div>

                  <div className="wkTime">{e.start} → {e.end}</div>
                  {e.cancelled && <span className="wkCancelled">Cancelled</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- main ----------
export default function Schedule() {
  const isMobile = useIsMobile(768);
  const [view, setView] = useState("week");

  const [cursorDate, setCursorDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const now = useNow(30000);

  useEffect(() => {
    if (!isMobile) return;
    const d = getMobileDefaultDate();
    setSelectedDate(d);
    setCursorDate(d);
    setView("week");
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setCursorDate(t);
    setSelectedDate(t);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && view !== "week") setView("week");
  }, [isMobile, view]);

  useEffect(() => {
    document.body.classList.add("isSchedule");
    return () => document.body.classList.remove("isSchedule");
  }, []);

  useEffect(() => {
    document.body.classList.add("hideHeaderOnScheduleMobile");
    return () => document.body.classList.remove("hideHeaderOnScheduleMobile");
  }, []);

  const allEvents = useMemo(() => {
    return scheduleItems.map((it, idx) => {
      const startMin = parseTimeToMinutes24(it.start);
      const endMin = parseTimeToMinutes24(it.end);
      return {
        id: `${it.course}-${it.date}-${idx}`,
        title: it.course,
        dateIso: it.date,
        location: it.location,
        room: it.room,
        start: it.start,
        end: it.end,
        startMin,
        endMin,
        duration: it.duration,
        cancelled: !!it.cancelled,
      };
    });
  }, []);

  const weekStart = useMemo(() => startOfWeekMonday(cursorDate), [cursorDate]);

  const headerMonthLabel = useMemo(() => {
    return `${MONTH_NAMES[cursorDate.getMonth()]} ${cursorDate.getFullYear()}`;
  }, [cursorDate]);

  const headerRightLabel = useMemo(() => {
    if (view === "week") return formatWeekRange(weekStart);
    if (view === "day") return formatShortDate(selectedDate);
    return "";
  }, [view, weekStart, selectedDate]);

  const selectionEvents = useMemo(() => {
    if (view === "day") {
      const iso = toLocalISO(selectedDate);
      return allEvents.filter((e) => e.dateIso === iso).sort((a, b) => a.startMin - b.startMin);
    }
    if (view === "week") {
      const startIso = toLocalISO(weekStart);
      const endIso = toLocalISO(addDays(weekStart, 7));
      return allEvents
        .filter((e) => e.dateIso >= startIso && e.dateIso < endIso)
        .sort((a, b) => (a.dateIso === b.dateIso ? a.startMin - b.startMin : a.dateIso.localeCompare(b.dateIso)));
    }
    const y = cursorDate.getFullYear();
    const m = cursorDate.getMonth();
    const monthStartIso = toLocalISO(new Date(y, m, 1));
    const nextMonthStartIso = toLocalISO(new Date(y, m + 1, 1));
    return allEvents
      .filter((e) => e.dateIso >= monthStartIso && e.dateIso < nextMonthStartIso)
      .sort((a, b) => (a.dateIso === b.dateIso ? a.startMin - b.startMin : a.dateIso.localeCompare(b.dateIso)));
  }, [allEvents, view, selectedDate, weekStart, cursorDate]);

  const eventsOfSelectedDay = useMemo(() => {
    const iso = toLocalISO(selectedDate);
    return allEvents.filter((e) => e.dateIso === iso).sort((a, b) => a.startMin - b.startMin);
  }, [allEvents, selectedDate]);

  function goPrev() {
    if (view === "day") {
      const d = addDays(selectedDate, -1);
      d.setHours(0, 0, 0, 0);
      setSelectedDate(d);
      setCursorDate(d);
      return;
    }
    if (view === "week") {
      const d = addDays(cursorDate, -7);
      d.setHours(0, 0, 0, 0);
      setCursorDate(d);
      setSelectedDate(d);
      return;
    }
    const d = addMonths(cursorDate, -1);
    d.setHours(0, 0, 0, 0);
    setCursorDate(d);
    setSelectedDate(d);
  }

  function goNext() {
    if (view === "day") {
      const d = addDays(selectedDate, 1);
      d.setHours(0, 0, 0, 0);
      setSelectedDate(d);
      setCursorDate(d);
      return;
    }
    if (view === "week") {
      const d = addDays(cursorDate, 7);
      d.setHours(0, 0, 0, 0);
      setCursorDate(d);
      setSelectedDate(d);
      return;
    }
    const d = addMonths(cursorDate, 1);
    d.setHours(0, 0, 0, 0);
    setCursorDate(d);
    setSelectedDate(d);
  }

  function goToday() {
    const t = isMobile ? getMobileDefaultDate() : new Date();
    t.setHours(0, 0, 0, 0);
    setCursorDate(t);
    setSelectedDate(t);
    if (isMobile) setView("week");
  }

  const hideDesktopTopOnMobileWeek = isMobile;

  return (
    <div className="schedPage">
      {!hideDesktopTopOnMobileWeek && (
        <div className="schedTop">
          <div className="schedTopLeft">
            <div className="schedMonth">{headerMonthLabel}</div>

            <div className="schedArrows">
              <button className="schedNavBtn" type="button" onClick={goPrev} aria-label="Previous">‹</button>
              <button className="schedTodayBtn" type="button" onClick={goToday}>Today</button>
              <button className="schedNavBtn" type="button" onClick={goNext} aria-label="Next">›</button>
            </div>
          </div>

          <div className="schedTopRight">
            <ViewTabs view={view} onChange={setView} />
            {headerRightLabel && <div className="schedRange">{headerRightLabel}</div>}
          </div>
        </div>
      )}

      {view === "week" && isMobile && (
        <div className="mWeekHeader">
          <button className="mWeekNav" type="button" onClick={goPrev} aria-label="Previous week">‹</button>
          <div className="mWeekTitle">{MONTH_NAMES[cursorDate.getMonth()]}</div>
          <button className="mWeekNav" type="button" onClick={goNext} aria-label="Next week">›</button>
        </div>
      )}

      <div className="schedBody">
        {view === "week" && !isMobile && (
          <WeekGrid
            weekStart={weekStart}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              const dd = new Date(d);
              dd.setHours(0, 0, 0, 0);
              setSelectedDate(dd);
            }}
            onOpenDay={(d) => {
              const dd = new Date(d);
              dd.setHours(0, 0, 0, 0);
              setSelectedDate(dd);
              setCursorDate(dd);
              setView("day");
            }}
            events={selectionEvents}
            now={now}
          />
        )}

        {view === "week" && isMobile && (
          <WeekMobile
            weekStart={weekStart}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              const dd = new Date(d);
              dd.setHours(0, 0, 0, 0);
              setSelectedDate(dd);
              setCursorDate(dd);
            }}
            eventsOfSelectedDay={eventsOfSelectedDay}
            now={now}
          />
        )}

        {view === "day" && (
          <DayGrid date={selectedDate} events={allEvents} now={now} />
        )}

        {view === "month" && (
          <MonthGrid
            cursorDate={cursorDate}
            selectedDate={selectedDate}
            onPickDate={(d) => {
              const dd = new Date(d);
              dd.setHours(0, 0, 0, 0);
              setSelectedDate(dd);
              setCursorDate(dd);
              setView("day");
            }}
            events={selectionEvents}
          />
        )}
      </div>
    </div>
  );
}