type Props = {
  city: string;
  setCity: (v: string) => void;

  startTime: string;
  setStartTime: (v: string) => void;

  endTime: string;
  setEndTime: (v: string) => void;

  interests: string[];
  setInterests: (v: string[]) => void;

  onGenerate: () => void;
  loading: boolean;
};

const OPTIONS = ["museum", "food", "park", "history"];

export default function SearchPanel({
  city,
  setCity,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  interests,
  setInterests,
  onGenerate,
  loading,
}: Props) {
  function toggleInterest(value: string) {
    if (interests.includes(value)) {
      setInterests(interests.filter((i) => i !== value));
    } else {
      setInterests([...interests, value]);
    }
  }

  return (
    <div className="space-y-5">
      
      {/* CITY */}
      <div>
        <label className="text-sm text-gray-600">City</label>
        <input
          className="w-full border rounded p-2 mt-1"
          placeholder="London"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* TIME */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm text-gray-600">Start</label>
          <input
            type="time"
            className="w-full border rounded p-2 mt-1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600">End</label>
          <input
            type="time"
            className="w-full border rounded p-2 mt-1"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      
      {/* INTERESTS */}
      <div>
        <label className="text-sm text-gray-600">Interests</label>

        <div className="flex flex-wrap gap-2 mt-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleInterest(opt)}
              className={`px-3 py-1 rounded-full text-sm border transition
                ${
                  interests.includes(opt)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        {loading ? "Generating..." : "Generate itinerary"}
      </button>
    </div>
  );
}