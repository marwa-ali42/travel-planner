import type { ItineraryItem } from "@/types";

const stories: Record<string, string[]> = {
  museum: [
    "Take your time at {place}, explore the highlights and see what catches your attention.",
    "Continue exploring at {place}. Discover something unexpected and soak up the atmosphere at your own pace.",
    "Step into {place} and give yourself time to explore. There's plenty to discover before you move on.",
  ],

  food: [
    "Follow your appetite to {place}. Take a break, explore what's on offer and enjoy something delicious.",
    "Time to recharge at {place}. Slow down, grab a bite and enjoy the local atmosphere.",
    "Make a stop at {place} and enjoy a taste of the local scene before continuing your adventure.",
  ],

  park: [
    "Slow the pace down at {place}. Enjoy some fresh air, stretch your legs and take a relaxing break.",
    "Take a breather at {place}. Wander through the open space and enjoy a quieter moment in your day.",
    "Give yourself some time at {place}. Enjoy the greenery, take a walk and recharge before the next stop.",
  ],

  history: [
    "Discover the stories behind {place} and get a feel for the history that shaped the area.",
    "Step back in time at {place}. Take your time exploring the stories and details that bring the place to life.",
    "Continue your journey through history at {place}. Look around, discover something new and enjoy the atmosphere.",
  ],

  landmark: [
    "Take in {place}, one of today's memorable sights. Pause for the views and enjoy the surroundings.",
    "Make the most of your stop at {place}. Take in the sights, explore the area and enjoy the moment.",
    "Discover {place} from your own perspective. Take a look around, enjoy the views and soak up the atmosphere.",
  ],

  default: [
    "Continue your adventure at {place}. Take your time, explore the surroundings and see what you discover.",
    "Next up is {place}. Take a moment to explore and enjoy another side of your day.",
    "Keep exploring at {place}. Slow down for a moment and make the most of this stop.",
  ],
};

const openingStories = [
  "Your adventure starts at {place}. Take your time, look around and enjoy the first stop of the day.",
  "Begin your day at {place}. Ease into the adventure, explore your surroundings and see where the day takes you.",
  "Start exploring at {place}. Take in your surroundings, settle into the day and enjoy the journey ahead.",
];

function getCategory(category: string) {
  const value = category.toLowerCase();

  if (value.includes("museum")) return "museum";
  if (value.includes("food")) return "food";
  if (value.includes("park")) return "park";
  if (value.includes("history")) return "history";
  if (value.includes("landmark")) return "landmark";

  return "default";
}

function selectVariant(
  variants: string[],
  index: number
) {
  return variants[index % variants.length];
}

export function getStory(
  item: ItineraryItem,
  index: number
) {
  if (index === 0) {
    const story = selectVariant(
      openingStories,
      index
    );

    return story.replace("{place}", item.place);
  }

  const category = getCategory(item.category);

  const variants = stories[category];

  const story = selectVariant(
    variants,
    index
  );

  return story.replace("{place}", item.place);
}