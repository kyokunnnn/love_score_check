import { Router } from "express";
import pool from "../db";
import { CorrectChoiceRow } from "../type/quizChoices";

const router = Router();

// 特定の質問の選択肢を取得する
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

// isCorrect(正解)の選択肢を一件取得する
router.get("/correct-choice/:quizId", async (req, res) => {
  const quizId = Number(req.params.quizId);
  const [rows] = await pool.query<CorrectChoiceRow[]>(
    `SELECT id,choice_text AS text FROM quiz_choices WHERE quiz_id = ? AND is_correct = TRUE LIMIT 1`,
    [quizId]
  );
  res.json(rows[0] || null);
});


export default router;
