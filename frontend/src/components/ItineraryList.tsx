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

      <div className="space-y-6">
        {itinerary.map((item, i) => (
          <div key={i} className="space-y-2">

            {/* STOP CARD */}
            <div className="border rounded-lg p-3 bg-white shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {i + 1}. {item.place}
                </h3>

                <span className="text-sm text-gray-500">
                  {item.category}
                </span>
              </div>

              <p className="text-sm mt-1">
                🕒 {item.start} → {item.end}
              </p>
            </div>

            {/* TRAVEL (between stops) */}
            {i < itinerary.length - 1 && (
              <div className="flex items-center gap-2 text-gray-500 text-sm pl-3">
                <span>🚶</span>
                <span>
                  {itinerary[i + 1].transit} min travel to next stop
                </span>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}