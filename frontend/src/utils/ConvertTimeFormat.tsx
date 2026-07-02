export default function formatMinutes(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  if (h === 0) return `${m} min`;
  return `${h}h ${m}m`;
}