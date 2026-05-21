const minutesInHour = 60;

// Convert minutes since midnight to "HH:MM" format
export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / minutesInHour);
  const m = minutes % minutesInHour;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Convert "HH:MM" format to minutes since midnight
export function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
    throw new Error(`Invalid time format: ${time}`);
  }
  return h * minutesInHour + m;
}