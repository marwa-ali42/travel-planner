import type { Place, OpeningHours } from "../types.js";
import { computeScore } from "./scoring.js";
import { formatTime, parseTime } from "../utils/time.js";
import { getTransitTimeMinutes } from "../utils/geo.js";

const TRAVEL_TIME_WEIGHT = 1.5;

function isPlaceAvailable(
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

  const [openTime, closeTime] = hours.split("-");

  if (!openTime || !closeTime) {
    return true;
  }

  const openMinutes = parseTime(openTime);
  const closeMinutes = parseTime(closeTime);

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

  return (
    arrivalTime + place.avg_visit_duration <= closeMinutes
  );
}

// Generate an itinerary by balancing place quality,
// user interests, travel time, opening hours,
// and the available time window.
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

  // If the user provides a starting location,
  // begin there. Otherwise fall back to the first place.
  let currentLat =
    startingLat ?? Number(places[0]?.latitude ?? 0);

  let currentLon =
    startingLon ?? Number(places[0]?.longitude ?? 0);

  let lastPlace: Place | null = null;

  while (
    currentTime < endTime &&
    availablePlaces.length > 0
  ) {
    const scored = availablePlaces.map((place) => {
      const transit = getTransitTimeMinutes(
        currentLat,
        currentLon,
        Number(place.latitude),
        Number(place.longitude)
      );

      const baseScore = computeScore(
        place,
        interests,
        lastPlace
      );

      const travelPenalty =
        transit * TRAVEL_TIME_WEIGHT;

      const finalScore =
        baseScore - travelPenalty;

      return {
        ...place,
        transit,
        score: finalScore,
      };
    });

    // Highest final score wins.
    scored.sort((a, b) => b.score - a.score);

    const best = scored[0];

    if (!best) {
      break;
    }

    const arrivalTime =
      currentTime + best.transit;

    // Do not select places that are closed
    // when we would arrive.
    if (
      !isPlaceAvailable(
        best,
        arrivalTime,
        dayOfWeek
      )
    ) {
      availablePlaces =
        availablePlaces.filter(
          (place) => place.id !== best.id
        );

      continue;
    }

    // Do not select places where the
    // entire visit would extend past closing.
    if (
      !canFinishBeforeClosing(
        best,
        arrivalTime,
        dayOfWeek
      )
    ) {
      availablePlaces =
        availablePlaces.filter(
          (place) => place.id !== best.id
        );

      continue;
    }

    const totalTime =
      best.transit +
      best.avg_visit_duration;

    // Do not select a place if the travel
    // plus visit would exceed the user's
    // available itinerary window.
    if (
      currentTime + totalTime > endTime
    ) {
      availablePlaces =
        availablePlaces.filter(
          (place) => place.id !== best.id
        );

      continue;
    }

    itinerary.push({
      place: best.name,
      category: best.category,
      start: formatTime(arrivalTime),
      end: formatTime(
        arrivalTime + best.avg_visit_duration
      ),
      transit: best.transit,
      latitude: Number(best.latitude),
      longitude: Number(best.longitude),
    });

    // Move the current position to the
    // destination we just visited.
    currentTime =
      arrivalTime +
      best.avg_visit_duration;

    currentLat =
      Number(best.latitude);

    currentLon =
      Number(best.longitude);

    lastPlace = best;

    // Never visit the same place twice.
    availablePlaces =
      availablePlaces.filter(
        (place) => place.id !== best.id
      );
  }

  return itinerary;
}