import { describe, expect, it } from "vitest";
import { generateDistanceAwareItinerary } from "../src/services/itinerary.js";
import type { Place } from "../src/types.js";

const places: Place[] = [
  {
    id: 1,
    name: "Museum",
    category: "museum",
    latitude: 51.5,
    longitude: -0.1,
    rating: 5,
    avg_visit_duration: 120,
    city: "London",
    country: "UK",
  },
  {
    id: 2,
    name: "Park",
    category: "park",
    latitude: 51.51,
    longitude: -0.11,
    rating: 4,
    avg_visit_duration: 60,
    city: "London",
    country: "UK",
  },
];

describe("generateDistanceAwareItinerary", () => {
  it("returns an empty itinerary when no places exist", () => {
    const result = generateDistanceAwareItinerary([], "09:00", "18:00", []);
    expect(result).toEqual([]);
  });

  it("returns at least one place", () => {
    const result = generateDistanceAwareItinerary(
      places,
      "09:00",
      "18:00",
      []
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it("prioritises matching interests", () => {
    const result = generateDistanceAwareItinerary(
      places,
      "09:00",
      "18:00",
      ["museum"]
    );

    expect(result[0]?.category).toBe("museum");
  });

  it("does not revisit the same place", () => {
    const result = generateDistanceAwareItinerary(
      places,
      "09:00",
      "18:00",
      []
    );

    const names = result.map((p) => p.place);

    expect(new Set(names).size).toBe(names.length);
  });

  it("respects the end time", () => {
    const result = generateDistanceAwareItinerary(
      places,
      "09:00",
      "10:00",
      []
    );

    expect(result.length).toBe(1);
  });

  it("respects the end time edge case", () => {
    const result = generateDistanceAwareItinerary(
      places,
      "09:00",
      "10:00",
      []
    );

    expect(result.length).toBe(1);
  });

  it("skips a place that is closed", () => {
    const placesWithHours: Place[] = [
      {
        ...places[0],
        opening_hours: {
          monday: "10:00-18:00",
          tuesday: "10:00-18:00",
          wednesday: "10:00-18:00",
          thursday: "10:00-18:00",
          friday: "10:00-18:00",
          saturday: "10:00-18:00",
          sunday: "10:00-18:00",
        },
      },
      {
        ...places[1],
        opening_hours: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "09:00-18:00",
          sunday: "09:00-18:00",
        },
      },
    ];

    const result = generateDistanceAwareItinerary(
      placesWithHours,
      "09:00",
      "18:00",
      ["museum"],
      undefined,
      undefined,
      "monday"
    );

    expect(result[0]?.place).toBe("Park");
  });

  it("skips a place when the visit would finish after closing", () => {
    const placesWithHours: Place[] = [
      {
        ...places[0],
        avg_visit_duration: 120,
        opening_hours: {
          monday: "09:00-10:00",
          tuesday: "09:00-10:00",
          wednesday: "09:00-10:00",
          thursday: "09:00-10:00",
          friday: "09:00-10:00",
          saturday: "09:00-10:00",
          sunday: "09:00-10:00",
        },
      },
      {
        ...places[1],
        opening_hours: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "09:00-18:00",
          sunday: "09:00-18:00",
        },
      },
    ];

    const result = generateDistanceAwareItinerary(
      placesWithHours,
      "09:00",
      "18:00",
      ["museum"],
      undefined,
      undefined,
      "monday"
    );

    expect(result[0]?.place).toBe("Park");
  });
});