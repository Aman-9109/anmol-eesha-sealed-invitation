import type { CSSProperties } from "react";

// Fixed positions keep server and client markup identical.
const MOTES = [
  [8, 82, 3, 7.5, -1], [18, 64, 2, 9, -4], [27, 90, 4, 8, -2.5], [36, 72, 2, 10, -6],
  [46, 86, 3, 8.5, -3], [55, 68, 2, 9.5, -7], [63, 92, 3, 7, -1.5], [72, 76, 4, 9, -5],
  [81, 88, 2, 8, -2], [90, 70, 3, 10, -6.5], [14, 40, 2, 9, -3.5], [86, 36, 2, 8.5, -4.5],
  [32, 30, 3, 10, -8], [68, 26, 2, 9, -2.2], [50, 48, 2, 11, -5.5], [5, 55, 3, 8, -7.2],
  [95, 50, 2, 9.5, -1.2], [40, 58, 2, 8, -3.1], [60, 52, 3, 9.2, -6.1], [22, 16, 2, 10, -4.2],
] as const;

const GLINTS = [
  [12, 22, 12, -1], [84, 14, 10, -3.5], [70, 60, 14, -2], [24, 70, 9, -5], [50, 8, 11, -4],
] as const;

export function SparkleField({ variant = "hero" }: { variant?: "opening" | "hero" | "celebrations" }) {
  const count = variant === "opening" ? 20 : variant === "hero" ? 14 : 10;
  return (
    <div className={`sparkle-field sparkle-field-${variant}`} aria-hidden="true">
      <div className="sparkle-haze" />
      {MOTES.slice(0, count).map(([left, top, size, dur, delay], i) => (
        <span
          key={i}
          className="gold-mote"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              "--mote-size": `${size}px`,
              "--mote-duration": `${dur}s`,
              "--mote-delay": `${delay}s`,
              "--mote-drift": `${i % 2 ? 14 : -12}px`,
            } as CSSProperties
          }
        />
      ))}
      {GLINTS.map(([left, top, size, delay], i) => (
        <span
          key={`g${i}`}
          className="gold-glint"
          style={{ left: `${left}%`, top: `${top}%`, "--glint-size": `${size}px`, "--glint-delay": `${delay}s` } as CSSProperties}
        />
      ))}
      {variant === "opening" && <div className="sparkle-lustre" />}
    </div>
  );
}
