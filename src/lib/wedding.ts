import heroArch from "@/assets/hero-arch.webp.asset.json";
import matapujanArt from "@/assets/matapujan.webp.asset.json";
import mandapArt from "@/assets/mandap.webp.asset.json";
import haldiArt from "@/assets/haldi.webp.asset.json";
import sangeetArt from "@/assets/sangeet.webp.asset.json";
import engagementArt from "@/assets/engagement.webp.asset.json";
import receptionArt from "@/assets/reception.webp.asset.json";

/**
 * Background song. Leave empty until the couple's MP3 is uploaded; the music
 * buttons stay disabled while this is empty.
 */
export const MUSIC_SRC = "";

export const COUPLE = {
  groom: {
    name: "Anmol",
    fullName: "Anmol Patariya",
    parents: ["S/O Late Shri Sunil Patariya", "& Smt. Nirmala Patariya"],
  },
  bride: {
    name: "Eesha",
    fullName: "Eesha Pakhariya",
    parents: ["D/O Late Shri Vishnu Pakhariya", "& Smt. Seema Pakhariya"],
  },
  initials: ["A", "E"] as const,
};

export const INVITATION_MESSAGE =
  "Love brought them together, family blesses their journey, and today we celebrate their forever.";

export const INVOCATION = "॥ श्री गणेशाय नमः ॥";
export const SHLOKA = [
  "मंगलम् भगवान वीष्णु, मंगलम् गरुड़ ध्वजः।",
  "मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥",
];

export const VENUE = {
  name: "The Orika Club & Resort",
  address: "Tilwara Road, Jabalpur, Madhya Pradesh",
  city: "Jabalpur",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("The Orika Club & Resort, Tilwara Road, Jabalpur"),
};

/** The countdown and "Save our date" card point to the Engagement. */
export const COUNTDOWN_TARGET = {
  label: "Engagement",
  iso: "2026-12-04T13:00:00+05:30",
  display: "4 December 2026 · 1:00 p.m. IST",
  day: "04",
  month: "December",
  yearLine: "2026 · Friday",
};

export const HOST = {
  name: "Nirmal Patariya",
  address: "Rampur, Purana Sai Mandir, Starbudes ke Peeche, Jabalpur (M.P.)",
  phones: ["7770904258", "8319908973"],
  firms: ["Patariya Market", "Infinity Pvt. Ltd."],
};

export const RSVP = [
  "Nirmala Patariya",
  "Vikrant – Rakhi Patariya (Bhai-Bhabhi)",
  "Rajveer Patariya",
  "Vaishnavi Patariya",
  "Misthi Patariya",
];

export type Celebration = {
  id: string;
  title: string;
  subtitle: string;
  dateLine: string;
  /** yyyy-mm-dd */
  date: string;
  /** 24h "HH:MM" IST; omitted when no time was given */
  time?: string;
  timeLabel?: string;
  venueName?: string;
  venueAddress?: string;
  description: string;
  art: string;
  theme: "rose" | "marigold" | "leaf" | "haldi" | "sangeet" | "blush" | "ivory";
};

export const CELEBRATIONS: Celebration[] = [
  {
    id: "matapujan",
    title: "Matapujan",
    subtitle: "Blessings of the Divine Mother",
    dateLine: "Tuesday, 1 December 2026",
    date: "2026-12-01",
    venueName: "At our residence",
    description: "We begin with prayers and the blessings of Mata Rani.",
    art: matapujanArt.url,
    theme: "marigold",
  },
  {
    id: "mandap",
    title: "Mandap",
    subtitle: "The Sacred Canopy",
    dateLine: "Wednesday, 2 December 2026",
    date: "2026-12-02",
    description: "The mandap is raised with rituals, blessings and family love.",
    art: mandapArt.url,
    theme: "leaf",
  },
  {
    id: "haldi",
    title: "Haldi",
    subtitle: "A Golden Afternoon",
    dateLine: "Thursday, 3 December 2026",
    date: "2026-12-03",
    time: "12:00",
    timeLabel: "12:00 p.m.",
    venueName: VENUE.name,
    venueAddress: VENUE.address,
    description: "Turmeric, marigolds, laughter and a whole lot of colour.",
    art: haldiArt.url,
    theme: "haldi",
  },
  {
    id: "sangeet",
    title: "Sangeet",
    subtitle: "An Evening of Music & Dance",
    dateLine: "Thursday, 3 December 2026",
    date: "2026-12-03",
    time: "19:00",
    timeLabel: "7:00 p.m.",
    venueName: VENUE.name,
    venueAddress: VENUE.address,
    description: "Dholak beats, family performances and dancing till late.",
    art: sangeetArt.url,
    theme: "sangeet",
  },
  {
    id: "engagement",
    title: "Engagement",
    subtitle: "The Exchange of Rings",
    dateLine: "Friday, 4 December 2026",
    date: "2026-12-04",
    time: "13:00",
    timeLabel: "1:00 p.m.",
    venueName: VENUE.name,
    venueAddress: VENUE.address,
    description: "Two hearts make a promise, surrounded by the people they love.",
    art: engagementArt.url,
    theme: "blush",
  },
  {
    id: "reception",
    title: "Reception",
    subtitle: "A Grand Celebration",
    dateLine: "Friday, 4 December 2026",
    date: "2026-12-04",
    time: "19:00",
    timeLabel: "7:00 p.m.",
    venueName: VENUE.name,
    venueAddress: VENUE.address,
    description: "Join us for an evening of dinner, blessings and celebration.",
    art: receptionArt.url,
    theme: "ivory",
  },
];

export const HERO_ARCH = heroArch.url;

const pad = (n: number) => String(n).padStart(2, "0");

/** Google Calendar link. Timed events last 3 hours; untimed ones are all-day. */
export function calendarUrl(c: Celebration) {
  const [y, m, d] = c.date.split("-").map(Number) as [number, number, number];
  let dates: string;
  if (c.time) {
    const [hh, mm] = c.time.split(":").map(Number) as [number, number];
    const start = new Date(Date.UTC(y, m - 1, d, hh, mm) - 330 * 60_000);
    const end = new Date(start.getTime() + 3 * 3600_000);
    const fmt = (t: Date) =>
      `${t.getUTCFullYear()}${pad(t.getUTCMonth() + 1)}${pad(t.getUTCDate())}T${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}00Z`;
    dates = `${fmt(start)}/${fmt(end)}`;
  } else {
    const next = new Date(Date.UTC(y, m - 1, d + 1));
    dates = `${y}${pad(m)}${pad(d)}/${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`;
  }
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Anmol & Eesha · ${c.title}`,
    dates,
    details: `${c.title} — ${c.subtitle}`,
  });
  if (c.venueName && c.venueAddress) params.set("location", `${c.venueName}, ${c.venueAddress}`);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function timeLeft(targetMs: number, nowMs: number) {
  const diff = Math.max(0, targetMs - nowMs);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
