const API_BASE = import.meta.env.VITE_API_URL;

export interface GenerateItineraryRequest {
  city: string;
  startTime: string;
  endTime: string;
  interests: string[];
}

export async function generateItinerary(
  data: GenerateItineraryRequest
) {
  console.log("API CALL", data);
  const response = await fetch(`${API_BASE}/itinerary/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error);
  }

  return body.itinerary;
}