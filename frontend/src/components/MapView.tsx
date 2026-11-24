import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import FitBounds from "@/utils/FitBounds";
import type { ItineraryItem } from "../types";
import createNumberIcon from "@/utils/NumberIcon";

type Props = {
  itinerary: ItineraryItem[];
  startingLat?: number | null;
  startingLon?: number | null;
  startingLocation?: string | null;
};

export default function MapView({
  itinerary,
  startingLat,
  startingLon,
  startingLocation,
}: Props) {
  const hasStartingLocation =
    startingLat !== undefined &&
    startingLat !== null &&
    startingLon !== undefined &&
    startingLon !== null;

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
        >
          <Popup>
            <strong>Starting point</strong>
            <br />
            {startingLocation || "Starting location"}
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

      <FitBounds
        itinerary={itinerary}
        startingLat={startingLat}
        startingLon={startingLon}
      />
    </MapContainer>
  );
}