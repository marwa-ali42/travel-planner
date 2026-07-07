import { Router } from "express";
import { pool } from "../db/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;

    let result;

    if (city) {
      result = await pool.query(
        "SELECT * FROM places WHERE LOWER(city) = LOWER($1)",
        [city]
      );
    } else {
      result = await pool.query(
        "SELECT * FROM places"
      );
    }

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;