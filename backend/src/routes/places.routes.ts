import { Router } from "express";
import { pool } from "../db/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Simple test route to fetch all places (for testing purposes)
    const result = await pool.query("SELECT * FROM places");
    res.json(result.rows);
  } catch (error) {
    // Log the error and return a 500 response
    console.log("DB query error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;