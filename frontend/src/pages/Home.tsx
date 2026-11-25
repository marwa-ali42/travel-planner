import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import ItineraryList from "../components/ItineraryList";
import Summary from "../components/Summary";
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

  const [resolvedStartingLat, setResolvedStartingLat] =
    useState<number | null>(null);

  const [resolvedStartingLon, setResolvedStartingLon] =
    useState<number | null>(null);

  const [locationStatus, setLocationStatus] = useState("");

  const [selectedStopIndex, setSelectedStopIndex] =
  useState<number | null>(null);

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
          startingLat !== undefined &&
          startingLon !== undefined
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

      setResolvedStartingLat(result.startingLat);
      setResolvedStartingLon(result.startingLon);

      console.log("Resolved starting location:", {
        place: result.startingLocation,
        latitude: result.startingLat,
        longitude: result.startingLon,
      });
    } catch (err) {
      console.error(
        "Failed to generate itinerary:",
        err
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* SEARCH */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl p-4">
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
        </div>
      </div>

      {/* RESULTS */}
      {hasItinerary ? (
        <main className="mx-auto max-w-7xl p-4 md:p-6">

          {/* SUMMARY */}
          <Summary itinerary={itinerary} />

          {/* STORY + MAP */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* STORY + LIST */}
            <div className="min-w-0 rounded-3xl bg-white shadow-sm">
              <ItineraryList
                itinerary={itinerary}
                selectedIndex={selectedStopIndex}
                onSelectStop={setSelectedStopIndex}
              />
            </div>

            {/* MAP */}
            <div className="h-[600px] overflow-hidden rounded-3xl shadow-sm">
              <MapView
                itinerary={itinerary}
                startingLat={resolvedStartingLat}
                startingLon={resolvedStartingLon}
                startingLocation={startingLocation}
                selectedIndex={selectedStopIndex}
                onSelectStop={setSelectedStopIndex}
              />
            </div>

          </div>
        </main>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
          <div>
            <div className="mb-4 text-5xl">✈️</div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your adventure is waiting
            </h2>

            <p className="mt-2 text-gray-500">
              Choose a destination and your interests to create your day.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}