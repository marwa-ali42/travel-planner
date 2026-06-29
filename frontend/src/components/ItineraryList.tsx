export default function ItineraryList() {
  return (
    <div className="p-4 space-y-4">
      <div className="border p-2 rounded">
        <h3 className="font-bold">Itinerary Item 1</h3>
        <p>Details about the itinerary item.</p>
      </div>
      <div className="border p-2 rounded">
        <h3 className="font-bold">Itinerary Item 2</h3>
        <p>Details about the itinerary item.</p>
      </div>
      {/* Add more itinerary items as needed */}
    </div>
  );
}