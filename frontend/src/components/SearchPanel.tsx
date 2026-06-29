export default function SearchPanel() {
  return (
    <div className="space-y-4">
      <input className="w-full border p-2" placeholder="City" />
      <input className="w-full border p-2" type="time" />
      <input className="w-full border p-2" type="time" />

      <button className="w-full bg-black text-white p-2 rounded">
        Generate
      </button>
    </div>
  );
}