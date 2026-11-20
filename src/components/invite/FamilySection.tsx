import { COUPLE, RSVP, SHLOKA } from "@/lib/wedding";
import { Monogram, SectionHeading } from "./Ornaments";

export function FamilySection() {
  const { groom, bride } = COUPLE;
  return (
    <section id="invitation" className="family-section" aria-labelledby="invitation-title">
      <div>
        <SectionHeading eyebrow="With love & blessings" title="An invitation from our hearts" id="invitation-title" />
        <p className="family-memory" lang="hi">
          {SHLOKA[0]}
          <br />
          {SHLOKA[1]}
        </p>
        <p>
          Together with our families, we joyfully invite you to celebrate the wedding of {groom.name} &amp;{" "}
          {bride.name}.
        </p>
        <div className="invitation-families">
          <div>
            <h2>{groom.name}</h2>
            <p>
              {groom.parents[0]}
              <br />
              {groom.parents[1]}
            </p>
          </div>
          <span className="family-weds">weds</span>
          <div>
            <h2>{bride.name}</h2>
            <p>
              {bride.parents[0]}
              <br />
              {bride.parents[1]}
            </p>
          </div>
        </div>
        <p className="family-blessing">Your gracious presence and warm blessings will make our celebration complete.</p>
        <div className="invitation-regards">
          <div>
            <h3>R.S.V.P.</h3>
            {RSVP.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
        <Monogram />
      </div>
    </section>
  );
}
