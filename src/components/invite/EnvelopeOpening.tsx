import { useEffect, useRef, useState } from "react";
import flapTop from "@/assets/flap-top.webp.asset.json";
import flapBottom from "@/assets/flap-bottom.webp.asset.json";
import seal from "@/assets/seal.webp.asset.json";
import { SparkleField } from "./SparkleField";

/** Length of the envelope opening, matching the reference (≈3.9s). */
export const OPEN_DURATION_MS = 3900;
/** Cross-fade from the opened envelope into the invitation. */
export const DISSOLVE_MS = 1400;

type Phase = "idle" | "opening" | "dissolving";

export function EnvelopeOpening({
  onStart,
  onOpen,
  onDone,
}: {
  onStart: () => void;
  onOpen: () => void;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const open = () => {
    if (phase !== "idle") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    onStart();
    setPhase("opening");
    const openFor = reduce ? 50 : OPEN_DURATION_MS;
    timers.current.push(
      window.setTimeout(() => {
        setPhase("dissolving");
        onOpen();
      }, openFor),
      window.setTimeout(onDone, openFor + (reduce ? 50 : DISSOLVE_MS)),
    );
  };

  return (
    <section
      className={`video-opening${phase === "dissolving" ? " video-opening-transitioning" : ""}`}
      data-phase={phase}
      aria-label="Wedding invitation opening"
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="env-clip-top" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.64 C1,0.86 0.74,1 0.5,1 C0.26,1 0,0.86 0,0.64 Z" />
          </clipPath>
          <clipPath id="env-clip-bottom" clipPathUnits="objectBoundingBox">
            <path d="M0,1 V0.9 C0.04,0.42 0.28,0.02 0.5,0.02 C0.72,0.02 0.96,0.42 1,0.9 V1 Z" />
          </clipPath>
          <clipPath id="env-clip-side" clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.5,0.22 0.78,0.5 0.62,0.78 C0.55,0.9 0.4,0.97 0.3,1 H0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="envelope-stage" aria-hidden="true">
        <div className="env-inside" />
        <div className="env-side env-side-left">
          <div className="env-paper" style={{ backgroundImage: `url(${flapTop.url})` }} />
        </div>
        <div className="env-side env-side-right">
          <div className="env-paper" style={{ backgroundImage: `url(${flapTop.url})` }} />
        </div>
        <div className="env-flap env-flap-bottom">
          <div className="env-paper" style={{ backgroundImage: `url(${flapBottom.url})` }} />
        </div>
        <div className="env-flap env-flap-top">
          <div className="env-paper" style={{ backgroundImage: `url(${flapTop.url})` }}>
            <span className="env-sheen" />
          </div>
          <img className="env-seal" src={seal.url} alt="" draggable={false} />
        </div>
      </div>

      <SparkleField variant="opening" />
      <div className="opening-transition-shine" />

      <button
        type="button"
        className="envelope-open-trigger"
        onClick={open}
        disabled={phase !== "idle"}
        aria-label="Tap to open the wedding invitation of Anmol and Eesha"
      >
        {phase === "idle" && (
          <span className="simple-open-label">Tap to open</span>
        )}
      </button>
    </section>
  );
}
