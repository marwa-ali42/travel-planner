import getSummary from "@/utils/DaySummary";
import formatMinutes from "@/utils/ConvertTimeFormat";
import type { ItineraryItem } from "../types";

export default function Summary({ itinerary }: { itinerary: ItineraryItem[] }) {
  const summary = getSummary(itinerary);
  
  return summary ? (
    <div className="p-3 border rounded bg-gray-50 m-4">
      <h3 className="font-semibold mb-2">Day Summary</h3>

      <p>📍 Stops: {summary.totalStops}</p>
      <p>🕒 Sightseeing: {formatMinutes(summary.totalSightseeing)}</p>
      <p>🚶 Travel: {formatMinutes(summary.totalTravel)}</p>
    </div>
  ): null;
}
