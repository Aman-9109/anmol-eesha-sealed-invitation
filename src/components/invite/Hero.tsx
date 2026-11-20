import { ArrowDown } from "lucide-react";
import couple from "@/assets/couple.webp.asset.json";
import { COUPLE, INVOCATION, INVITATION_MESSAGE, VENUE } from "@/lib/wedding";
import { SparkleField } from "./SparkleField";

export function Hero({ revealed }: { revealed: boolean }) {
  return (
    <section id="our-wedding" className={`cinematic-hero${revealed ? " hero-is-revealed" : ""}`}>
      <SparkleField variant="hero" />
      <div className="hero-editorial-topline">
        <span>A celebration of togetherness</span>
        <span>{VENUE.city} · December 2026</span>
      </div>
      <div className="hero-editorial-grid">
        <div className="hero-portrait-column">
          <p className="hero-portrait-caption">
            <span>Two hearts</span>
            <i />
            <span>One forever</span>
          </p>
          <div className="hero-couple couple-portrait">
            <div className="portrait-aura" />
            <svg className="portrait-arch" viewBox="0 0 400 540" fill="none" aria-hidden="true">
              <path className="arch-fill" d="M20 530V200C20 95 100 18 200 18s180 77 180 182v330Z" />
              <path d="M20 530V200C20 95 100 18 200 18s180 77 180 182v330" />
              <path className="arch-inner-line" d="M34 530V204C34 108 108 32 200 32s166 76 166 172v326" />
              <path
                className="arch-travelling-glint"
                pathLength={1}
                d="M20 530V200C20 95 100 18 200 18s180 77 180 182v330"
              />
              <path className="arch-baseline" d="M8 530h384" />
            </svg>
            <div className="portrait-plinth" />
            <div className="portrait-illustration">
              <img src={couple.url} alt="Illustrated wedding portrait of Anmol and Eesha" />
            </div>
            <span className="portrait-star portrait-star-one">✦</span>
            <span className="portrait-star portrait-star-two">✧</span>
            <span className="portrait-star portrait-star-three">✧</span>
          </div>
          <p className="hero-art-caption">The beginning of our beautiful forever</p>
        </div>

        <div className="hero-inner">
          <p className="ganesh-invocation" lang="hi">{INVOCATION}</p>
          <p className="eyebrow">Together with our families</p>
          <h1 tabIndex={-1}>
            <span className="hero-name">{COUPLE.groom.name}</span>
            <span className="hero-ampersand">&amp;</span>
            <span className="hero-name">{COUPLE.bride.name}</span>
          </h1>
          <p className="hero-invitation-line">{INVITATION_MESSAGE}</p>
          <div className="hero-date">
            <span>Tuesday – Friday</span>
            <time dateTime="2026-12-01">1 – 4 December 2026</time>
            <span>{VENUE.city}</span>
          </div>
          <a className="button button-solid focus-ring" href="#celebrations">
            Explore the celebrations <ArrowDown size={18} />
          </a>
          <p className="hero-footnote">Your presence and blessings mean the world to us.</p>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#invitation">
        Our invitation to you <ArrowDown size={16} />
      </a>
    </section>
  );
}
