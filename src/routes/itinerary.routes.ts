import { Router } from "express";
import { pool } from "@/db/index.js";
import { type Place } from "@/types.js";
import { generateGreedyItinerary } from "@/services/itinerary.js";

const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { city, startTime, endTime, interests } = req.body;

    // Fetch places from the database in the specified city
    const result = await pool.query<Place>("SELECT * FROM places WHERE city = $1;", [city]);
    
    // Generate itinerary using the greedy algorithm
    const itinerary = generateGreedyItinerary(result.rows, startTime, endTime, interests || []);

    // Return the generated itinerary as JSON
    res.json({ itinerary });
  } catch (error) {
    // Log the error and return a 500 response
    console.error(error);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
});

export default router;