import { CalendarPlus, Clock, MapPin, Navigation } from "lucide-react";
import { CELEBRATIONS, VENUE, calendarUrl } from "@/lib/wedding";
import { SectionHeading } from "./Ornaments";
import { SparkleField } from "./SparkleField";

export function Celebrations() {
  return (
    <section id="celebrations" className="celebrations-section" aria-labelledby="celebrations-title">
      <SparkleField variant="celebrations" />
      <SectionHeading eyebrow={`1 – 4 December 2026 · ${VENUE.city}`} title="Let the celebrations begin" id="celebrations-title" />
      <p className="section-intro">Cherished traditions, joyful music, and a lifetime of love.</p>
      <div className="events">
        {CELEBRATIONS.map((c, i) => (
          <article key={c.id} className={`wedding-function-card event-${c.theme}`}>
            <div className="function-card-heading">
              <div className="ceremony-heading-art" aria-hidden="true">
                <img src={c.art} alt="" loading="lazy" />
              </div>
              <span className="function-card-event-badge">Celebration {String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p className="function-card-subtitle">{c.subtitle}</p>
            </div>
            <div className="function-card-details">
              <p className="function-card-date-line">{c.dateLine}</p>
              {c.timeLabel && (
                <p className="function-card-time">
                  <Clock size={18} />
                  <strong>{c.timeLabel}</strong>
                  <span>IST</span>
                </p>
              )}
              {c.venueName && (
                <div className="function-card-venue-block">
                  <MapPin size={22} />
                  <h4>{c.venueName}</h4>
                  {c.venueAddress && <p>{c.venueAddress}</p>}
                </div>
              )}
              <p className="event-description">{c.description}</p>
              <div className="event-actions">
                {c.venueAddress && (
                  <a className="button button-solid focus-ring" href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
                    <Navigation size={18} /> Get directions
                  </a>
                )}
                <a className="calendar-link focus-ring" href={calendarUrl(c)} target="_blank" rel="noreferrer">
                  <CalendarPlus size={18} /> Add to calendar
                </a>
              </div>
            </div>
            <div className="ceremony-footer-art" aria-hidden="true">
              <img src={c.art} alt="" loading="lazy" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
