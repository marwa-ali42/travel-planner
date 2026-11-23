import type { Place, OpeningHours } from "../types.js";
import { computeScore } from "./scoring.js";
import { formatTime, parseTime } from "../utils/time.js";
import { getTransitTimeMinutes } from "../utils/geo.js";

const TRAVEL_TIME_WEIGHT = 0.2;

function isPlaceAvailable(
  place: Place,
  arrivalTime: number,
  dayOfWeek?: keyof OpeningHours
): boolean {
  // If no opening-hours/day information exists,
  // keep the existing behaviour.
  if (!dayOfWeek || !place.opening_hours) {
    return true;
  }

  const hours = place.opening_hours[dayOfWeek];

  if (!hours || hours.toLowerCase() === "closed") {
    return false;
  }

  const [openTime, closeTime] = hours.split("-");

  if (!openTime || !closeTime) {
    return true;
  }

  const openMinutes = parseTime(openTime);
  const closeMinutes = parseTime(closeTime);

  // Place must be open when we arrive.
  return arrivalTime >= openMinutes && arrivalTime < closeMinutes;
}

function canFinishBeforeClosing(
  place: Place,
  arrivalTime: number,
  dayOfWeek?: keyof OpeningHours
): boolean {
  if (!dayOfWeek || !place.opening_hours) {
    return true;
  }

  const hours = place.opening_hours[dayOfWeek];

  if (!hours || hours.toLowerCase() === "closed") {
    return false;
  }

  const [, closeTime] = hours.split("-");

  if (!closeTime) {
    return true;
  }

  const closeMinutes = parseTime(closeTime);

  // The entire visit must finish before closing.
  return arrivalTime + place.avg_visit_duration <= closeMinutes;
}

// Generate an itinerary that prioritizes places based on score and transit time
export function generateDistanceAwareItinerary(
  places: Place[],
  startTimeStr: string,
  endTimeStr: string,
  interests: string[],
  startingLat?: number,
  startingLon?: number,
  dayOfWeek?: keyof OpeningHours
) {
  let currentTime = parseTime(startTimeStr || "09:00");
  const endTime = parseTime(endTimeStr || "18:00");
  const itinerary = [];

  let availablePlaces = [...places];

  let currentLat = startingLat ?? Number(places[0]?.latitude ?? 0);
  let currentLon = startingLon ?? Number(places[0]?.longitude ?? 0);

  let lastPlace: Place | null = null;

  while (currentTime < endTime && availablePlaces.length > 0) {
    const scored = availablePlaces.map((p) => {
      const transit = getTransitTimeMinutes(
        currentLat,
        currentLon,
        Number(p.latitude),
        Number(p.longitude)
      );

      return {
        ...p,
        score: computeScore(p, interests, lastPlace) - transit * TRAVEL_TIME_WEIGHT,
        transit,
      };
    });

    scored.sort((a, b) => b.score - a.score);

    const best = scored[0];
    if (!best) break;

    const arrival = currentTime + best.transit;

    // Skip places that are closed when we arrive.
    if (!isPlaceAvailable(best, arrival, dayOfWeek)) {
      availablePlaces = availablePlaces.filter(
        (p) => p.id !== best.id
      );
      continue;
    }

    // Skip places where the visit would continue past closing.
    if (!canFinishBeforeClosing(best, arrival, dayOfWeek)) {
      availablePlaces = availablePlaces.filter(
        (p) => p.id !== best.id
      );
      continue;
    }

    const totalTime = best.transit + best.avg_visit_duration;

    // Skip places that would exceed the user's overall itinerary time.
    if (currentTime + totalTime > endTime) {
      availablePlaces = availablePlaces.filter(
        (p) => p.id !== best.id
      );
      continue;
    }

    itinerary.push({
      place: best.name,
      category: best.category,
      start: formatTime(arrival),
      end: formatTime(arrival + best.avg_visit_duration),
      transit: best.transit,
      latitude: Number(best.latitude),
      longitude: Number(best.longitude),
    });

    currentTime = arrival + best.avg_visit_duration;
    currentLat = Number(best.latitude);
    currentLon = Number(best.longitude);
    lastPlace = best;

    availablePlaces = availablePlaces.filter(
      (p) => p.id !== best.id
    );
  }

  return itinerary;
}