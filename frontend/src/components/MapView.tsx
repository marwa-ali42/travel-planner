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
};


export default function MapView({ itinerary }: Props) {
  return (
    <MapContainer
      center={[51.5072, -0.1276]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {itinerary.map((item, i) => (
        <Marker
          key={item.place}
          position={[item.latitude, item.longitude]}
          icon={createNumberIcon(i + 1)}
        >
          <Popup>
            <strong>
              {i + 1}. {item.place}
            </strong>
            <br />
            {item.start} – {item.end}
          </Popup>
        </Marker>
      ))}

      <Polyline
        positions={itinerary.map((item) => [
          item.latitude,
          item.longitude,
        ])}
        color="#7494d8"
        weight={4}
      />

      <FitBounds itinerary={itinerary} />
    </MapContainer>
  );
}