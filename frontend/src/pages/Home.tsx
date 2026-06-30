import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import ItineraryList from "../components/ItineraryList";
import type { ItineraryItem } from "@/types";
import { useState } from "react";

const API_BASE = "http://localhost:3000";

export default function Home() {
  const [city, setCity] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [interests, setInterests] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Function to generate itinerary
  async function handleGenerate() {
  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/itinerary/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city,
        startTime,
        endTime,
        interests,
      }),
    });

    const data = await res.json();
    setItinerary(data.itinerary);
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
  }
  
  return (
    <div className="h-screen flex flex-col">
      
      {/* top section */}
      <div className="flex flex-1">
        
        <div className="w-1/3 p-4 border-r">
          <SearchPanel
            city={city}
            setCity={setCity}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            interests={interests}
            setInterests={setInterests}
            onGenerate={handleGenerate}
            loading={loading}
          />
        </div>

        <div className="flex-1">
          <MapView itinerary={itinerary} />
        </div>

      </div>

      {/* bottom section */}
      <div className="h-1/3 border-t overflow-auto">
        <ItineraryList itinerary={itinerary} />
      </div>

    </div>
  );
}