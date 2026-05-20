import { Router } from "express";
import { pool } from "../db/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM places");
  res.json(result.rows);
});

export default router;