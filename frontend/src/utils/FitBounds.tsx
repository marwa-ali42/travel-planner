import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { ItineraryItem } from "../types";

type Props = {
  itinerary: ItineraryItem[];
  startingLat?: number | null;
  startingLon?: number | null;
};

export default function FitBounds({
  itinerary,
  startingLat,
  startingLon,
}: Props) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [];

    if (
      startingLat !== undefined &&
      startingLat !== null &&
      startingLon !== undefined &&
      startingLon !== null
    ) {
      points.push([startingLat, startingLon]);
    }

    itinerary.forEach((item) => {
      points.push([item.latitude, item.longitude]);
    });

    if (points.length === 0) {
      return;
    }

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [
    itinerary,
    startingLat,
    startingLon,
    map,
  ]);

  return null;
}