import { Router } from "express";
import { pool } from "../db";
import { CorrectChoiceRow, QuizChoiceRow } from "../type/quizChoices";

const router = Router();

// isCorrect(正解)の選択肢を一件取得する
router.get("/correct-choice/:quizId", async (req, res): Promise<void> => {
  const quizId = Number(req.params.quizId);
  if (!Number.isFinite(quizId)) {
    res.status(400).json({ error: "quizId must be a number" });
    return;
  }

  const { rows } = await pool.query<CorrectChoiceRow>(
    `
    SELECT id, choice_text AS "text"
    FROM quiz_choices
    WHERE quiz_id = $1
      AND is_correct = TRUE
      AND deleted_at IS NULL
    ORDER BY id
    LIMIT 1
    `,
    [quizId]
  );

  // 見つからなければ 404 にするか、null を返すかは好みで
  if (!rows[0]) {
    res.status(404).json({ error: "correct choice not found" });
    return;
  }
  res.json(rows[0]); // rows: CorrectChoiceRow[]
});

// 一覧取得（特定クイズの全選択肢）
router.get("/:quiz_id", async (req, res): Promise<void> => {
  const quizId = Number(req.params.quiz_id);
  if (!Number.isFinite(quizId)) {
    res.status(400).json({ error: "quiz_id must be a number" });
    return;
  }

  const { rows } = await pool.query<QuizChoiceRow>(
    `
    SELECT id, quiz_id, choice_text, is_correct, created_at, updated_at, deleted_at
    FROM quiz_choices
    WHERE quiz_id = $1
      AND deleted_at IS NULL
    ORDER BY id
    `,
    [quizId]
  );

  res.json(rows);
});


export default router;
