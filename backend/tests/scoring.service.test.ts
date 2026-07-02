import { describe, expect, it } from "vitest";
import { computeScore } from "../src/services/scoring.js";
import type { Place } from "../src/types.js";

const place: Place = {
  id: 1,
  name: "Museum",
  category: "museum",
  latitude: 0,
  longitude: 0,
  rating: 5,
  avg_visit_duration: 60,
  city: "London",
  country: "UK",
};

describe("computeScore", () => {
  it("adds interest bonus", () => {
    expect(computeScore(place, ["museum"], null)).toBeGreaterThan(5);
  });

  it("returns rating when no interests match", () => {
    expect(computeScore(place, ["park"], null)).toBe(5);
  });
});