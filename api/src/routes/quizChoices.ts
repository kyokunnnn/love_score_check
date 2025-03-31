import { Router } from "express";
import pool from "../db";

const router = Router();

// 特定の質問の選択肢を取得
router.get("/:quiz_id", async (req, res) => {
  try {
    const quizId = Number(req.params.quiz_id);
    const [rows] = await pool.query(
      "SELECT * FROM quiz_choices WHERE quiz_id = ?",
      [quizId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
