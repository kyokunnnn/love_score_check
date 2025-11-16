import { Router } from "express";
import { pool } from "../db";

const router = Router();

// 全ての答えを取得
router.get("/", async (_, res) => {
  try {
    const {rows} = await pool.query<AnswerResponse>("SELECT * FROM answers");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 特定の答えを取得
router.get("/:quizId", async (req, res): Promise<void> => {
  const quizId = Number(req.params.quizId);
  if (!Number.isFinite(quizId)) {
    res.status(400).json({ error: "quizId must be a number" });
    return;
  }

  try {
    const { rows } = await pool.query<AnswerResponse>(
      `
      SELECT
        id,
        text,
        category,
        quiz_id AS "quizId"
      FROM answers
      WHERE quiz_id = $1
        AND deleted_at IS NULL
      ORDER BY id
      `,
      [quizId]
    );

    res.json(rows); // AnswerResponse[]
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});


export default router;
