import type { Place } from "@/types.js";
import { getTransitTimeMinutes } from "../utils/geo.js";

// Compute score based on rating, interest match, and transit time from the last place
export function computeScore(
  place: Place,
  interests: string[],
  lastPlace: Place | null
): number {
  let score = Number(place.rating) || 0;

  // Add 2 points for interest match
  if (interests.includes(place.category)) {
    score += 2;
  }

  // Subtract points based on transit time from the last place (assuming 30 minutes per point)
  if (lastPlace) {
    const travel = getTransitTimeMinutes(
      Number(lastPlace.latitude),
      Number(lastPlace.longitude),
      Number(place.latitude),
      Number(place.longitude)
    );

    score -= travel / 30;
  }

  return score;
}