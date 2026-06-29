
import type { Place } from "../types.js";
import { computeScore } from "./scoring.js";
import { formatTime, parseTime } from "../utils/time.js";
import { getTransitTimeMinutes } from "../utils/geo.js";

// Generate an itinerary that prioritizes places based on score and transit time
export function generateDistanceAwareItinerary(
  places: Place[],
  startTimeStr: string,
  endTimeStr: string,
  interests: string[],
  startingLat?: number,
  startingLon?: number
  ) {
  // Convert start and end times to minutes since midnight
  let currentTime = parseTime(startTimeStr || "09:00");
  const endTime = parseTime(endTimeStr || "18:00");
  const itinerary = [];

  // Create a mutable copy of the places array
  let availablePlaces = [...places];

  // Initialize current location to starting point or first place
  let currentLat = startingLat ?? Number(places[0]?.latitude ?? 0);
  let currentLon = startingLon ?? Number(places[0]?.longitude ?? 0);

  // Keep track of the last place visited to calculate transit times
  let lastPlace: Place | null = null;

  // Loop until we run out of time or places
  while (currentTime < endTime && availablePlaces.length > 0) {
    const scored = availablePlaces.map((p) => {
      // Calculate transit time from current location to this place
      const transit = lastPlace
        ? getTransitTimeMinutes(
            currentLat,
            currentLon,
            Number(p.latitude),
            Number(p.longitude)
          )
        : 0;
      
      // Compute the score for this place based on interests and transit time
      return {
        ...p,
        score: computeScore(p, interests, lastPlace),
        transit,
      };
    });

    // Sort places by score in descending order
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    if (!best) break;

    // Calculate total time needed to visit this place (transit + visit duration)
    const totalTime = best.transit + best.avg_visit_duration;

    // If visiting this place would exceed the end time, skip it and try the next best
    if (currentTime + totalTime > endTime) {
      availablePlaces = availablePlaces.filter((p) => p.id !== best.id);
      continue;
    }

    const arrival = currentTime + best.transit;

    // Add this place to the itinerary
    itinerary.push({
      place: best.name,
      category: best.category,
      start: formatTime(arrival),
      end: formatTime(arrival + best.avg_visit_duration),
      transit: best.transit,
    });

    // Update current time and location
    currentTime = arrival + best.avg_visit_duration;
    currentLat = Number(best.latitude);
    currentLon = Number(best.longitude);
    lastPlace = best;

    // Remove this place from the available places
    availablePlaces = availablePlaces.filter((p) => p.id !== best.id);
  }

  return itinerary;
}