import type { ItineraryItem } from "../types";

export default function getSummary(itinerary: ItineraryItem[]) {
  if (!itinerary.length) return null;

  let totalTravel = 0;
  let totalSightseeing = 0;

  for (let i = 0; i < itinerary.length; i++) {
    const item = itinerary[i];

    const start = item.start.split(":").map(Number);
    const end = item.end.split(":").map(Number);

    const duration =
      end[0] * 60 +
      end[1] -
      (start[0] * 60 + start[1]);

    totalSightseeing += duration;

    // Travel time into the next stop.
    if (i < itinerary.length - 1) {
      totalTravel += itinerary[i + 1].transit || 0;
    }
  }

  const categories = Array.from(
    new Set(itinerary.map((item) => getCategory(item.category)))
  );

  console.log(
    "SUMMARY CATEGORIES:",
    itinerary.map((item) => ({
      place: item.place,
      category: item.category,
    })),
    "=>",
    categories
  );

  return {
    totalSightseeing,
    totalTravel,
    totalStops: itinerary.length,
    categories,
    headline: getHeadline(categories),
    description: getDescription(categories),
  };
}

function getCategory(category: string) {
  const value = category.trim().toLowerCase();

  if (value.includes("food")) return "food";
  if (value.includes("museum")) return "culture";
  if (value.includes("history")) return "history";
  if (value.includes("park")) return "nature";
  if (value.includes("landmark")) return "sights";

  return "exploring";
}

function getHeadline(categories: string[]) {
  const has = (category: string) =>
    categories.includes(category);

  // 3+ distinct themes
  if (
    has("food") &&
    (has("culture") || has("history")) &&
    has("nature")
  ) {
    return "A day of food, culture and fresh air ✨";
  }

  // Food + culture/history
  if (
    has("food") &&
    (has("culture") || has("history"))
  ) {
    return "A day of discovery and delicious stops ✨";
  }

  // Food + nature
  if (
    has("food") &&
    has("nature")
  ) {
    return "A day of good food and open spaces ✨";
  }

  // Culture + history
  if (
    has("culture") &&
    has("history")
  ) {
    return "A day through stories and history ✨";
  }

  // Culture only
  if (has("culture")) {
    return "A day of discovery and culture ✨";
  }

  // History only
  if (has("history")) {
    return "A day through history ✨";
  }

  // Nature only
  if (has("nature")) {
    return "A day to explore and slow down ✨";
  }

  // Food only
  if (has("food")) {
    return "A day worth tasting ✨";
  }

  // Landmarks only
  if (has("sights")) {
    return "A day of memorable sights ✨";
  }

  return "A day of exploring ✨";
}

function getDescription(categories: string[]) {
  const has = (category: string) =>
    categories.includes(category);

  // Explicit combinations first
  if (
    has("food") &&
    (has("culture") || has("history")) &&
    has("nature")
  ) {
    return "A day combining good food, interesting stories and green spaces, with plenty to discover along the way.";
  }

  if (
    has("food") &&
    (has("culture") || has("history"))
  ) {
    return "A day combining good food and fascinating places, with plenty to discover along the way.";
  }

  if (
    has("food") &&
    has("nature")
  ) {
    return "A relaxed day of good food, fresh air and exploring.";
  }

  if (
    has("culture") &&
    has("history")
  ) {
    return "A day of museums, stories and places shaped by the past.";
  }

  if (has("culture")) {
    return "A day of museums, discovery and fascinating things to explore.";
  }

  if (has("history")) {
    return "A day uncovering stories, places and the history behind them.";
  }

  if (has("nature")) {
    return "A relaxed day of parks, fresh air and exploring.";
  }

  if (has("food")) {
    return "A day of local flavours, good food and places worth discovering.";
  }

  if (has("sights")) {
    return "A day of memorable sights and places worth exploring.";
  }

  return "A day of exploring, discovering and making the most of your time.";
}