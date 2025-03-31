import { Router } from "express";
import pool from "../db";

const router = Router();

// 全ての質問を取得
router.get("/", async (_, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM questions");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 特定の質問を取得
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM questions WHERE id = ?", [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;