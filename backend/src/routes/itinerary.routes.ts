import { Router } from "express";
import { pool } from "../db/index.js";
import { type Place } from "../types.js";
import { generateDistanceAwareItinerary } from "../services/itinerary.js";

const router = Router();

router.post("/generate", async (req, res) => {
  try {
    console.log("Calling backend...");
    const { city, startTime, endTime, interests } = req.body;

    // Validate required parameters
    if (!city) {
      return res.status(400).json({
        error: "City is required"
      });
    }

    if (!Array.isArray(interests)) {
      return res.status(400).json({
        error: "Interests must be an array"
      });
    }

    // Fetch places from the database in the specified city
    const result = await pool.query<Place>(
      "SELECT * FROM places WHERE LOWER(city) = LOWER($1);",
      [city.trim()]
    );

    // If query returns empty results, return empty itinerary array
    if (result.rows.length === 0) {
      return res.status(200).json({
        itinerary: []
      });
    }
    
    // Generate itinerary using the distance-aware algorithm
    const itinerary = generateDistanceAwareItinerary(result.rows, startTime, endTime, interests || []);

    // Return the generated itinerary as JSON
    res.status(200).json({ itinerary });
  } catch (error) {
    // Log the error and return a 500 response
    console.error(error);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
});

export default router;

