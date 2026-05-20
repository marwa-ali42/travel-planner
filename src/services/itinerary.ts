import type { Place, ScoredPlace } from "@/types.js";

// Simple greedy algorithm to generate an itinerary based on ratings and user interests

//Travel buffer time in minutes to account for transit between places
const TRAVEL_BUFFER = 30;

// Default time range for the itinerary if not provided is 9:00 AM to 5:00 PM
const DEFAULT_START_TIME = 540; // 9:00 AM in minutes since midnight
const DEFAULT_END_TIME = 1080; // 6:00 PM in minutes since midnight

// Compute a simple score based on rating and interest match
function computeScore(place: Place, interests: string[]): number {
  let score = Number(place.rating) || 0;
  if (interests.includes(place.category)) score += 2;
  return score;
}

// Convert minutes since midnight to "HH:MM" format
function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Greedy algorithm to generate an itinerary
export function generateGreedyItinerary(
  places: Place[], 
  startTimeStr: string, 
  endTimeStr: string, 
  interests: string[]
) {
  // Convert "HH:MM" string formats to numbers
  const startParts = (startTimeStr || "").split(':').map(Number);
  const endParts = (endTimeStr || "").split(':').map(Number);

  // Convert times to minutes since midnight for easier calculations
  let currentTime = (startParts[0] * 60 + startParts[1]) || DEFAULT_START_TIME;
  const endTime = (endParts[0] * 60 + endParts[1]) || DEFAULT_END_TIME;

  // Sort places by rating and interest match upfront to optimize selection
  const itinerary = [];

  // Create a mutable copy of places to filter out candidates that don't fit
  let availablePlaces = [...places];

  while (currentTime < endTime && availablePlaces.length > 0) {
    const scored: ScoredPlace[] = availablePlaces.map(p => ({
      ...p,
      score: computeScore(p, interests)
    }));

    scored.sort((a, b) => b.score - a.score);
    const bestPlace = scored[0];
    if (!bestPlace) {
      break;
    }

    // Check if there is enough time to visit this place
    if (currentTime + bestPlace.avg_visit_duration > endTime) {
      availablePlaces = availablePlaces.filter(p => p.id !== bestPlace.id);
      continue; 
    }

    // Add the best place to the itinerary
    itinerary.push({
      place: bestPlace.name,
      start: formatTime(currentTime),
      end: formatTime(currentTime + bestPlace.avg_visit_duration),
      category: bestPlace.category
    });

    // Update current time and remove the place from available options
    currentTime += bestPlace.avg_visit_duration + TRAVEL_BUFFER;
    availablePlaces = availablePlaces.filter(p => p.id !== bestPlace.id);
  }

  return itinerary;
}