import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import ItineraryList from "../components/ItineraryList";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      
      {/* top section */}
      <div className="flex flex-1">
        
        <div className="w-1/3 p-4 border-r">
          <SearchPanel />
        </div>

        <div className="flex-1">
          <MapView />
        </div>

      </div>

      {/* bottom section */}
      <div className="h-1/3 border-t overflow-auto">
        <ItineraryList />
      </div>

    </div>
  );
}