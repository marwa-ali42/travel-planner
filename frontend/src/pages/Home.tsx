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

  const [startingLocation, setStartingLocation] = useState("");
  const [startingLat, setStartingLat] = useState<number | undefined>();
  const [startingLon, setStartingLon] = useState<number | undefined>();
  const [locationStatus, setLocationStatus] = useState("");

  const hasItinerary = itinerary.length > 0;

  function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("Location is not supported by this browser.");
      return;
    }

    setLocationStatus("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStartingLat(position.coords.latitude);
        setStartingLon(position.coords.longitude);
        setStartingLocation("Current location");
        setLocationStatus("✓ Current location detected");
      },
      (error) => {
        console.warn("Location unavailable:", error);

        setStartingLat(undefined);
        setStartingLon(undefined);

        setLocationStatus(
          "Could not get your location. Enter a starting place instead."
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 600000,
      }
    );
  }

  async function handleGenerate() {
    setLoading(true);

    try {
      console.log("Starting location:", {
        place: startingLocation || null,
        coordinates:
          startingLat !== undefined && startingLon !== undefined
            ? {
                latitude: startingLat,
                longitude: startingLon,
              }
            : null,
      });

      const result = await generateItinerary({
        city,
        startTime,
        endTime,
        interests,
        startingLocation: startingLocation || undefined,
        startingLat,
        startingLon,
      });

      setItinerary(result.itinerary);

      console.log("Resolved starting location:", {
        place: result.startingLocation,
        latitude: result.startingLat,
        longitude: result.startingLon,
      });
    } catch (err) {
      console.error("Failed to generate itinerary:", err);
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
            startingLocation={startingLocation}
            setStartingLocation={setStartingLocation}
            onUseCurrentLocation={handleUseCurrentLocation}
            locationStatus={locationStatus}
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