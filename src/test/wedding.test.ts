import { describe, expect, it } from "vitest";
import { CELEBRATIONS, COUNTDOWN_TARGET, calendarUrl, timeLeft } from "@/lib/wedding";

describe("wedding rules", () => {
  it("counts down to the Engagement on 4 Dec 2026 at 1:00 PM IST", () => {
    expect(COUNTDOWN_TARGET.label).toBe("Engagement");
    expect(new Date(COUNTDOWN_TARGET.iso).toISOString()).toBe("2026-12-04T07:30:00.000Z");
  });

  it("shows no time for Matapujan and Mandap", () => {
    for (const id of ["matapujan", "mandap"]) {
      const c = CELEBRATIONS.find((e) => e.id === id);
      expect(c?.time).toBeUndefined();
      expect(c?.timeLabel).toBeUndefined();
    }
  });

  it("adds untimed events to the calendar as all-day", () => {
    const mandap = CELEBRATIONS.find((e) => e.id === "mandap");
    expect(mandap && calendarUrl(mandap)).toContain("dates=20261202%2F20261203");
  });

  it("puts the Engagement in the calendar at 1:00 PM IST", () => {
    const e = CELEBRATIONS.find((c) => c.id === "engagement");
    expect(e && calendarUrl(e)).toContain("dates=20261204T073000Z%2F20261204T103000Z");
  });

  it("reaches zero after the engagement starts", () => {
    expect(timeLeft(1000, 5000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
