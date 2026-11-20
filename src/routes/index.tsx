import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { EnvelopeOpening } from "@/components/invite/EnvelopeOpening";
import { MusicControls, SiteNav } from "@/components/invite/SiteNav";
import { Hero } from "@/components/invite/Hero";
import { FamilySection } from "@/components/invite/FamilySection";
import { CountdownSection } from "@/components/invite/CountdownSection";
import { Celebrations } from "@/components/invite/Celebrations";
import { SiteFooter, VenueSection } from "@/components/invite/VenueAndFooter";
import { CELEBRATIONS, HERO_ARCH, MUSIC_SRC } from "@/lib/wedding";

const ROSE_ART = CELEBRATIONS.find((c) => c.id === "sangeet")?.art ?? HERO_ARCH;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anmol & Eesha · Wedding Invitation · 1–4 December 2026" },
      {
        name: "description",
        content:
          "You're invited to celebrate Anmol & Eesha — Matapujan, Mandap, Haldi, Sangeet, Engagement and Reception, 1–4 December 2026 at The Orika Club & Resort, Jabalpur.",
      },
      { property: "og:title", content: "Anmol & Eesha · Wedding Invitation" },
      {
        property: "og:description",
        content: "Join us in Jabalpur, 1–4 December 2026, as Anmol & Eesha begin their forever.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // showOpening: envelope is mounted; revealed: invitation is visible.
  const [showOpening, setShowOpening] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("opening-locked", showOpening && !revealed);
  }, [showOpening, revealed]);

  const startMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a || !MUSIC_SRC) return;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const replay = () => {
    window.scrollTo({ top: 0 });
    setRevealed(false);
    setShowOpening(true);
  };

  return (
    <>
      {MUSIC_SRC && <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />}
      {showOpening && (
        <EnvelopeOpening
          onStart={startMusic}
          onOpen={() => setRevealed(true)}
          onDone={() => setShowOpening(false)}
        />
      )}
      <div
        className={`invitation${revealed ? " is-revealed" : ""}`}
        inert={!revealed}
        aria-hidden={!revealed}
        style={{ "--band-art": `url(${HERO_ARCH})`, "--rose-art": `url(${ROSE_ART})` } as CSSProperties}
      >
        <SiteNav />
        <MusicControls audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
        <main>
          <Hero revealed={revealed} />
          <FamilySection />
          <CountdownSection />
          <Celebrations />
          <VenueSection />
        </main>
        <SiteFooter onReplay={replay} />
      </div>
    </>
  );
}
