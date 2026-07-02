import type { ItineraryItem } from "../types";

export default function getSummary(itinerary: ItineraryItem[]) {
  if (!itinerary.length) return null;

  let totalTravel = 0;
  let totalSightseeing = 0;

  for (let i = 0; i < itinerary.length; i++) {
    const item = itinerary[i];

    // sightseeing time
    const start = item.start.split(":").map(Number);
    const end = item.end.split(":").map(Number);

    const duration = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
    totalSightseeing += duration;

    // travel time (except last item)
    if (i < itinerary.length - 1) {
      totalTravel += itinerary[i + 1].transit || 0;
    }
  }

  return {
    totalSightseeing,
    totalTravel,
    totalStops: itinerary.length,
  };
}