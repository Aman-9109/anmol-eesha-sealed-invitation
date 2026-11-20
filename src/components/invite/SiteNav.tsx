import { useEffect, useRef, useState } from "react";
import { Menu, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { MUSIC_SRC } from "@/lib/wedding";

const LINKS = [
  ["#our-wedding", "Our Wedding"],
  ["#celebrations", "Celebrations"],
  ["#venue", "Venue"],
  ["#contact", "Contact"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="nav-mark" href="#our-wedding" onClick={() => setOpen(false)}>
        A <span>&amp;</span> E
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <div className={`nav-links${open ? " nav-links-open" : ""}`}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
      <span className="reading-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}

/** Play/pause + mute. Disabled until a song is set in MUSIC_SRC. */
export function MusicControls({ audioRef, playing, setPlaying }: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setPlaying: (v: boolean) => void;
}) {
  const [muted, setMuted] = useState(false);
  const hasSong = MUSIC_SRC.length > 0;
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted, audioRef]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="music-controls">
      <button
        type="button"
        className="icon-button"
        onClick={toggle}
        disabled={!hasSong}
        aria-label={!hasSong ? "Music coming soon" : playing ? "Pause music" : "Play music"}
        title={!hasSong ? "Music coming soon" : undefined}
      >
        {playing ? <Pause /> : <Play />}
      </button>
      <button
        type="button"
        className="icon-button"
        onClick={() => setMuted((m) => !m)}
        disabled={!hasSong}
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <VolumeX /> : <Volume2 />}
      </button>
    </div>
  );
}
