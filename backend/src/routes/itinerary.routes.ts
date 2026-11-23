import { Router } from "express";
import { pool } from "../db/index.js";
import { type Place } from "../types.js";
import { generateDistanceAwareItinerary } from "../services/itinerary.js";
import { geocodePlace } from "../services/geocoding.js";

const router = Router();

router.post("/generate", async (req, res) => {
  try {
    console.log("Calling backend...");

    const {
      city,
      startTime,
      endTime,
      interests,
      dayOfWeek,
      startingLocation,
      startingLat,
      startingLon,
    } = req.body;

    if (!city) {
      return res.status(400).json({
        error: "City is required",
      });
    }

    if (!Array.isArray(interests)) {
      return res.status(400).json({
        error: "Interests must be an array",
      });
    }

    if (
      startingLat !== undefined &&
      typeof startingLat !== "number"
    ) {
      return res.status(400).json({
        error: "startingLat must be a number",
      });
    }

    if (
      startingLon !== undefined &&
      typeof startingLon !== "number"
    ) {
      return res.status(400).json({
        error: "startingLon must be a number",
      });
    }

    let resolvedLat = startingLat;
    let resolvedLon = startingLon;

    // If the user entered a starting place,
    // convert it to coordinates.
    if (
      startingLocation &&
      resolvedLat === undefined &&
      resolvedLon === undefined
    ) {
      const coordinates = await geocodePlace(
        `${startingLocation}, ${city}`
      );

      if (!coordinates) {
        return res.status(400).json({
          error: `Could not find starting location: ${startingLocation}`,
        });
      }

      resolvedLat = coordinates.latitude;
      resolvedLon = coordinates.longitude;

      console.log(
        "Geocoded starting location:",
        startingLocation,
        resolvedLat,
        resolvedLon
      );
    }

    const result = await pool.query<Place>(
      "SELECT * FROM places WHERE LOWER(city) = LOWER($1);",
      [city.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No places found for this city",
      });
    }

    const itinerary = generateDistanceAwareItinerary(
      result.rows,
      startTime,
      endTime,
      interests || [],
      resolvedLat,
      resolvedLon,
      dayOfWeek
    );

    res.status(200).json({
      itinerary,
      startingLocation: startingLocation || null,
      startingLat: resolvedLat ?? null,
      startingLon: resolvedLon ?? null,
    });
    
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate itinerary.",
    });
  }
});

export default router;