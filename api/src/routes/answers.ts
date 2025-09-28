import { Router } from "express";
import pool from "../db";

const router = Router();

// 全ての答えを取得
router.get("/", async (_, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM answers");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 特定の答えを取得
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM answers WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
