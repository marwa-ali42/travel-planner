import type { ItineraryItem } from "@/types";

type StoryContext = {
  item: ItineraryItem;
  index: number;
  total: number;
  previous?: ItineraryItem;
  next?: ItineraryItem;
};

const openingStories = [
  "Your adventure starts at {place}. Take your time, look around and enjoy the first stop of the day.",
  "Begin your day at {place}. Ease into the adventure, explore your surroundings and see where the day takes you.",
  "Start exploring at {place}. Take in your surroundings, settle into the day and enjoy the journey ahead.",
];

const endingStories = [
  "Bring your day to a close at {place}. Take your time, enjoy the surroundings and make this final stop count.",
  "Your adventure winds down at {place}. Slow the pace, enjoy the moment and take in the final stop of the day.",
  "Finish your day at {place}. Take a final look around, relax and enjoy how the day's journey comes together.",
];

const transitionStories: Record<string, string[]> = {
  "food->park": [
    "With something good behind you, slow the pace down at {place}. Enjoy some fresh air and a quieter moment.",
    "After your food stop, it's time to change the pace. Take a relaxing walk around {place}.",
  ],

  "food->museum": [
    "With lunch behind you, it's time to get exploring again at {place}.",
    "Refuelled and ready for more, continue the adventure at {place}.",
  ],

  "food->landmark": [
    "With a chance to recharge behind you, head towards {place} and take in the sights.",
    "After a well-earned break, continue on to {place} and see what awaits.",
  ],

  "museum->food": [
    "After all that exploring, it's time to follow your appetite at {place}.",
    "Ready for a change of pace? Head to {place} for something delicious.",
  ],

  "museum->park": [
    "After exploring indoors, step outside and slow things down at {place}.",
    "Leave the galleries behind for a while and enjoy some fresh air at {place}.",
  ],

  "museum->landmark": [
    "Keep the discoveries coming at {place}. There's another memorable sight waiting ahead.",
    "Ready for the next chapter? Continue exploring at {place}.",
  ],

  "park->food": [
    "After some fresh air, it's time to recharge at {place}.",
    "Feeling refreshed? Follow the journey to {place} for something to eat.",
  ],

  "park->museum": [
    "Ready to get exploring again? Continue the journey at {place}.",
    "With a little fresh air behind you, head inside and discover more at {place}.",
  ],

  "park->landmark": [
    "Keep the adventure moving and make your way to {place}.",
    "From green space to city sights, continue on to {place}.",
  ],
};

const categoryStories: Record<string, string[]> = {
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

function fill(
  story: string,
  place: string
) {
  return story.replace("{place}", place);
}

export function getStory({
  item,
  index,
  total,
  previous,
}: StoryContext) {
  const currentCategory = getCategory(item.category);

  // First stop
  if (index === 0) {
    return fill(
      selectVariant(openingStories, index),
      item.place
    );
  }

  // Final stop
  if (index === total - 1) {
    return fill(
      selectVariant(endingStories, index),
      item.place
    );
  }

  // Try a category transition first
  if (previous) {
    const previousCategory =
      getCategory(previous.category);

    const transitionKey =
      `${previousCategory}->${currentCategory}`;

    const transition =
      transitionStories[transitionKey];

    if (transition) {
      return fill(
        selectVariant(transition, index),
        item.place
      );
    }
  }

  // Fall back to category-specific story
  return fill(
    selectVariant(
      categoryStories[currentCategory],
      index
    ),
    item.place
  );
}