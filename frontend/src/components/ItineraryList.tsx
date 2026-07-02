import type { ItineraryItem } from "@/types";

export default function ItineraryList({
  itinerary,
}: {
  itinerary: ItineraryItem[];
}) {
  if (!itinerary.length) {
    return (
      <div className="p-4 text-gray-500">
        No itinerary yet. Generate a trip ✈️
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Your itinerary</h2>

      <div className="space-y-3">
        {itinerary.map((item, i) => (
          <div
            key={i}
            className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* top row */}
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">
                {i + 1}. {item.place}
              </h3>

              <span className="text-sm text-gray-500">
                {item.category}
              </span>
            </div>

            {/* time */}
            <p className="text-sm text-gray-700 mt-1">
              🕒 {item.start} → {item.end}
            </p>

            {/* transit */}
            {item.transit !== undefined && item.transit > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                🚶 {item.transit} min travel
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}