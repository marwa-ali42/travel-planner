import type { ItineraryItem } from "@/types";

function getIcon(category: string) {
  const value = category.toLowerCase();

  if (value.includes("museum")) return "🏛️";
  if (value.includes("food")) return "🍜";
  if (value.includes("park")) return "🌳";
  if (value.includes("history")) return "📜";

  return "✨";
}

function getStory(item: ItineraryItem, index: number) {
  const category = item.category.toLowerCase();

  if (index === 0) {
    if (category.includes("museum")) {
      return "Start your adventure by stepping into the city's stories and discovering something new.";
    }

    if (category.includes("food")) {
      return "Start your adventure with something delicious and get a taste of the city.";
    }

    if (category.includes("park")) {
      return "Ease into the day with some fresh air and a slower start.";
    }

    if (category.includes("history")) {
      return "Begin your journey by discovering the history that shaped this place.";
    }

    return "Your adventure starts here. Take your time and enjoy the first stop.";
  }

  if (category.includes("museum")) {
    return "Take your time to explore, discover something unexpected, and soak up the atmosphere.";
  }

  if (category.includes("food")) {
    return "Time to follow your appetite. Slow down, grab a bite, and enjoy the local flavour.";
  }

  if (category.includes("park")) {
    return "After exploring, slow the pace down with some fresh air and a relaxing walk.";
  }

  if (category.includes("history")) {
    return "Continue exploring the stories and places that helped shape the city.";
  }

  return "Keep exploring and see where the day takes you.";
}

export default function ItineraryList({
  itinerary,
}: {
  itinerary: ItineraryItem[];
}) {
  if (!itinerary.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <div className="mb-2 text-3xl">🗺️</div>

        <h3 className="text-lg font-semibold text-gray-900">
          No itinerary yet
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Generate a trip and your adventure will appear here ✈️
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Your journey
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Let the adventure begin ✨
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Follow your day from one memorable stop to the next.
        </p>
      </div>

      <div>
        {itinerary.map((item, i) => (
          <div key={`${item.place}-${i}`} className="relative">
            <div className="flex gap-4">
              {/* Timeline */}
              <div className="flex w-10 shrink-0 flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg">
                  {getIcon(item.category)}
                </div>

                {i < itinerary.length - 1 && (
                  <div className="mt-2 min-h-16 w-px bg-gray-200" />
                )}
              </div>

              {/* Story */}
              <div className="mb-8 flex-1">
                <div className="text-sm font-semibold text-indigo-600">
                  {item.start}
                </div>

                <div className="mt-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.place}
                      </h3>

                      <span className="mt-1 inline-block text-sm capitalize text-gray-500">
                        {item.category}
                      </span>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {item.start} – {item.end}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {getStory(item, i)}
                  </p>
                </div>

                {/* Travel to next stop */}
                {i < itinerary.length - 1 && (
                  <div className="mt-3 flex items-center gap-2 pl-2 text-sm text-gray-500">
                    <span>🚶</span>

                    <span>
                      {itinerary[i + 1].transit} min to your next stop
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}