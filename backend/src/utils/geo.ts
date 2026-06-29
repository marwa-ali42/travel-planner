// Calculate transit time in minutes between two geographic coordinates using the Haversine formula
export function getTransitTimeMinutes(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
// Earth radius in kilometers
  const R = 6371;

  // Convert degrees to radians
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine formula
  const a =
  Math.sin(dLat / 2) ** 2 +
  Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  // Calculate the great circle distance in kilometers
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = R * c;
  const minutesPerKm = 3;
  // Ensure a minimum transit time of 10 minutes to account for real-world conditions
  return Math.max(10, Math.round(distanceKm * minutesPerKm));
}