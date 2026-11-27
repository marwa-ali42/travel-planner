import getSummary from "@/utils/DaySummary";
import formatMinutes from "@/utils/ConvertTimeFormat";
import type { ItineraryItem } from "../types";

export default function Summary({
  itinerary,
}: {
  itinerary: ItineraryItem[];
}) {
  const summary = getSummary(itinerary);

  if (!summary) {
    return null;
  }

  return (
    <div className="m-4 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
        Your day
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {summary.headline}
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/80">
        {summary.description}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
          <div className="text-xl font-bold">
            {summary.totalStops}
          </div>

          <div className="text-xs text-white/70">
            stops
          </div>
        </div>

        <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
          <div className="text-xl font-bold">
            {formatMinutes(summary.totalSightseeing)}
          </div>

          <div className="text-xs text-white/70">
            exploring
          </div>
        </div>

        <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
          <div className="text-xl font-bold">
            {formatMinutes(summary.totalTravel)}
          </div>

          <div className="text-xs text-white/70">
            travelling
          </div>
        </div>
      </div>
    </div>
  );
}