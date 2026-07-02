import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import ItineraryList from "../components/ItineraryList";
import Summary from "../components/Summary.js";
import type { ItineraryItem } from "@/types";
import { useState } from "react";
import { generateItinerary } from "@/services/api";

export default function Home() {
  const [city, setCity] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [interests, setInterests] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const hasItinerary = itinerary.length > 0;
  
  // Function to generate itinerary
  async function handleGenerate() {
    setLoading(true);

    try {
      const itinerary = await generateItinerary({
        city,
        startTime,
        endTime,
        interests,
      });

      setItinerary(itinerary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="h-screen flex flex-col">

      {/* TOP SECTION */}
      <div className="flex flex-1">

        {/* LEFT SIDE */}
        <div className="w-1/3 p-4 border-r flex flex-col gap-4">

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

          {hasItinerary && <Summary itinerary={itinerary} />}

        </div>

        {/* MAP */}
        <div className="flex-1">
          {hasItinerary ? (
            <MapView itinerary={itinerary} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Generate a trip to see the map 🗺️
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="h-1/3 border-t overflow-auto">
        <ItineraryList itinerary={itinerary} />
      </div>

    </div>
  );
}