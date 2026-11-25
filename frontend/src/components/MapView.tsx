import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import FitBounds from "@/utils/FitBounds";
import type { ItineraryItem } from "../types";
import createNumberIcon from "@/utils/NumberIcon";

const getAssetUrl = (asset: string | { src: string }) =>
  typeof asset === "string" ? asset : asset.src;

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: getAssetUrl(markerIcon),
  iconRetinaUrl: getAssetUrl(markerIcon2x),
  shadowUrl: getAssetUrl(markerShadow),
});

type Props = {
  itinerary: ItineraryItem[];
  startingLat?: number | null;
  startingLon?: number | null;
  startingLocation?: string | null;
  selectedIndex: number | null;
  onSelectStop: (index: number) => void;
};

function FocusSelectedStop({
  itinerary,
  selectedIndex,
}: {
  itinerary: ItineraryItem[];
  selectedIndex: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (
      selectedIndex === null ||
      !itinerary[selectedIndex]
    ) {
      return;
    }

    const stop = itinerary[selectedIndex];

    map.flyTo(
      [stop.latitude, stop.longitude],
      15,
      {
        duration: 0.8,
      }
    );
  }, [itinerary, selectedIndex, map]);

  return null;
}

function createStartingIcon(isCurrentLocation: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${isCurrentLocation ? "#2563eb" : "#ffffff"};
          border: 4px solid ${isCurrentLocation ? "#ffffff" : "#2563eb"};
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        "
      >
        ${isCurrentLocation ? "📍" : "🏁"}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default function MapView({
  itinerary,
  startingLat,
  startingLon,
  startingLocation,
  selectedIndex,
  onSelectStop,
}: Props) {
  const hasStartingLocation =
    startingLat !== undefined &&
    startingLat !== null &&
    startingLon !== undefined &&
    startingLon !== null;
  
  const isCurrentLocation =
    startingLocation === "Current location";

  const routePositions: [number, number][] = [];

  if (hasStartingLocation) {
    routePositions.push([
      startingLat!,
      startingLon!,
    ]);
  }

  itinerary.forEach((item) => {
    routePositions.push([
      item.latitude,
      item.longitude,
    ]);
  });

  return (
    <MapContainer
      center={[51.5072, -0.1276]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hasStartingLocation && (
        <Marker
          position={[
            startingLat!,
            startingLon!,
          ]}
          icon={createStartingIcon(isCurrentLocation)}
        >
          <Popup>
            <strong>
              {isCurrentLocation
                ? "📍 You are here"
                : "🏁 Starting point"}
            </strong>

            <br />

            {isCurrentLocation
              ? "Your journey starts here"
              : startingLocation || "Starting location"}
          </Popup>
        </Marker>
      )}

      {itinerary.map((item, i) => (
        <Marker
          key={`${item.place}-${i}`}
          position={[
            item.latitude,
            item.longitude,
          ]}
          icon={createNumberIcon(i + 1)}
          eventHandlers={{
            click: () => onSelectStop(i),
          }}
        >
          <Popup>
            <strong>
              {i + 1}. {item.place}
            </strong>

            <br />

            {item.start} – {item.end}

            <br />

            {item.transit > 0 &&
              `${item.transit} min travel`}
          </Popup>
        </Marker>
      ))}

      {routePositions.length > 1 && (
        <Polyline
          positions={routePositions}
          color="#7494d8"
          weight={4}
        />
      )}

      <FocusSelectedStop
        itinerary={itinerary}
        selectedIndex={selectedIndex}
      />

      <FitBounds
        itinerary={itinerary}
        startingLat={startingLat}
        startingLon={startingLon}
      />
    </MapContainer>
  );
}