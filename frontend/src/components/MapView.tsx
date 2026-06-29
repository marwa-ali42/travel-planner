import { MapContainer, TileLayer } from "react-leaflet";

export default function MapView() {
  return (
    <MapContainer
      center={[51.5072, -0.1276]} // London
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}