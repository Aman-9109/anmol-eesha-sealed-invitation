import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { COUNTDOWN_TARGET, COUPLE, VENUE, timeLeft } from "@/lib/wedding";
import { SectionHeading } from "./Ornaments";

const TARGET_MS = new Date(COUNTDOWN_TARGET.iso).getTime();
const clockFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function ScratchCard() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const paint = () => {
      const { width, height } = box.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#c9a44e");
      g.addColorStop(0.35, "#ecd58f");
      g.addColorStop(0.55, "#f7e9b5");
      g.addColorStop(0.75, "#d9b964");
      g.addColorStop(1, "#b8913f");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(140,105,40,.45)";
      ctx.strokeRect(10.5, 10.5, width - 21, height - 21);
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = `rgba(255,250,225,${Math.random() * 0.6})`;
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.textAlign = "center";
      ctx.fillStyle = "#4a3a1c";
      ctx.font = "700 17px Manrope, sans-serif";
      ctx.fillText("A date to remember", width / 2, height / 2 - 4);
      ctx.font = "italic 500 20px 'Cormorant Garamond', serif";
      ctx.fillText("Scratch here, or reveal below", width / 2, height / 2 + 26);
    };
    paint();
    document.fonts?.ready.then(paint).catch(() => {});
  }, []);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = e.currentTarget;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 24, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkCleared = () => {
    drawing.current = false;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || revealed) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total > 0.45) setRevealed(true);
  };

  return (
    <div className="scratch-card-wrapper">
      <div ref={boxRef} className="scratch-card-box" role="region" aria-label="Scratch card revealing the engagement date">
        <div className="scratch-underlay">
          <div className="scratch-inner-border">
            <p className="scratch-kicker">Save The Date</p>
            <div className="scratch-date-display">
              <span className="scratch-day-num">{COUNTDOWN_TARGET.day}</span>
              <span className="scratch-month-col">
                <strong>{COUNTDOWN_TARGET.month.toUpperCase()}</strong>
                <span>{COUNTDOWN_TARGET.yearLine}</span>
              </span>
            </div>
            <p className="scratch-couple-names">
              {COUPLE.groom.name} <span>&amp;</span> {COUPLE.bride.name}
            </p>
            <p className="scratch-venue-city">
              {VENUE.name}, {VENUE.city}
            </p>
            <p className="scratch-forever-pill">
              <Heart size={13} /> Our engagement · 1:00 p.m.
            </p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className={`scratch-canvas${revealed ? " is-revealed" : ""}`}
          aria-hidden="true"
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={checkCleared}
          onPointerCancel={checkCleared}
        />
        {revealed && (
          <div className="scratch-confetti-container" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} className="confetti-piece" style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 0.08}s` }} />
            ))}
          </div>
        )}
      </div>
      <div className="scratch-actions-row">
        {revealed ? (
          <p className="scratch-status-hint scratch-revealed-text">See you on 4 December!</p>
        ) : (
          <>
            <p className="scratch-status-hint">A little surprise, just for you</p>
            <button type="button" className="scratch-reveal-button focus-ring" onClick={() => setRevealed(true)}>
              Reveal the date
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const left = now === null ? null : timeLeft(TARGET_MS, now);
  const cells: [string, number | undefined][] = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Minutes", left?.minutes],
    ["Seconds", left?.seconds],
  ];
  return (
    <>
      <div className="countdown" role="timer" aria-live="off">
        {cells.map(([label, v]) => (
          <div key={label}>
            <strong>{v === undefined ? "--" : String(v).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-clock">Current time: {now === null ? "—" : `${clockFmt.format(now)} IST`}</p>
    </>
  );
}

export function CountdownSection() {
  return (
    <section className="countdown-section" aria-label="Save the date and countdown">
      <div className="date-keepsake">
        <SectionHeading eyebrow="A little moment of joy" title="Save our date" />
        <ScratchCard />
      </div>
      <div className="countdown-panel">
        <SectionHeading eyebrow="Until we celebrate together" title="The sweetest wait" />
        <p className="countdown-label">Counting down to our engagement</p>
        <p className="countdown-target">{COUNTDOWN_TARGET.display}</p>
        <Countdown />
      </div>
    </section>
  );
}
