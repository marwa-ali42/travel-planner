import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { ItineraryItem } from "../types";

export default function FitBounds({ itinerary }: { itinerary: ItineraryItem[] }) {
  const map = useMap();

  useEffect(() => {
    if (itinerary.length === 0) return;

    const bounds = L.latLngBounds(
      itinerary.map((item) => [item.latitude, item.longitude])
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [itinerary, map]);

  return null;
}