import { ArrowUp, MapPin, RotateCcw } from "lucide-react";
import { HERO_ARCH, HOST, VENUE } from "@/lib/wedding";
import { Monogram, SectionHeading } from "./Ornaments";

export function VenueSection() {
  return (
    <section id="venue" className="venue-section" aria-labelledby="venue-title">
      <div className="venue-artwork" style={{ backgroundImage: `url(${HERO_ARCH})` }} aria-hidden="true" />
      <div className="venue-content">
        <SectionHeading eyebrow="A beautiful place for a new beginning" title="Meet us here" id="venue-title" />
        <MapPin className="venue-pin" />
        <h3>{VENUE.name}</h3>
        <p>{VENUE.address}</p>
        <a className="button button-solid focus-ring" href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={18} /> Open in Google Maps
        </a>
      </div>
    </section>
  );
}

export function SiteFooter({ onReplay }: { onReplay: () => void }) {
  return (
    <footer id="contact">
      <div className="closing-copy">
        <Monogram />
        <SectionHeading eyebrow="We are here to help" title="With warm regards" />
        <p className="closing-message">{HOST.name}</p>
        <p>{HOST.address}</p>
        <div className="family-contacts">
          <div className="contact-numbers">
            <p className="contact-label">Contact:</p>
            {HOST.phones.map((p) => (
              <p key={p} className="contact-number">
                <a href={`tel:+91${p}`}>+91 {p.slice(0, 5)} {p.slice(5)}</a>
              </p>
            ))}
          </div>
        </div>
        <p className="closing-firms">{HOST.firms.join("  |  ")}</p>
        <div className="closing-rule" />
        <p className="closing-note">Our celebration is complete with you.</p>
        <div className="closing-navigation">
          <a className="back-to-top" href="#our-wedding">
            Back to the invitation <ArrowUp size={14} />
          </a>
          <button type="button" className="opening-replay" onClick={onReplay}>
            <RotateCcw size={16} /> Replay the entrance
          </button>
        </div>
      </div>
    </footer>
  );
}
