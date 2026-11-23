export interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function geocodePlace(
  place: string
): Promise<Coordinates | null> {
  const query = place.trim();

  if (!query) {
    return null;
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");

  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "PlanMyHoliday/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status}`);
  }

  const results = (await response.json()) as Array<{
    lat: string;
    lon: string;
  }>;

  if (results.length === 0) {
    return null;
  }

  return {
    latitude: Number(results[0].lat),
    longitude: Number(results[0].lon),
  };
}