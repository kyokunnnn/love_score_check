import { Router } from "express";
import pool from "../db";
import { QuizChoiceRow } from "../type/questions";

const router = Router();

// カテゴリー毎に複数のクイズと選択肢をまとめて取得
router.get("/", async (req, res): Promise<void> => {
  const categoryId = Number(req.query.category);
  if (!Number.isFinite(categoryId)) {
    res.status(400).json({ error: "category must be a number" });
    return;
  }

  try {
    const { rows } = await pool.query<QuizChoiceRow>(
      `
      SELECT
        q.id          AS question_id,
        q.text        AS question_text,
        c.id          AS choice_id,
        c.choice_text AS choice_text,
        c.is_correct  AS is_correct
      FROM questions q
      LEFT JOIN quiz_choices c
        ON c.quiz_id = q.id
       AND c.deleted_at IS NULL
      WHERE q.category = $1
        AND q.deleted_at IS NULL
      ORDER BY q.id, c.id
      `,
      [categoryId]
    );

    // 整形
    const quizzesMap = new Map<number, {
      questionId: number;
      questionText: string;
      choices: { id: number; text: string; isCorrect: boolean }[];
    }>();

    for (const r of rows) {
      let entry = quizzesMap.get(r.question_id);
      if (!entry) {
        entry = {
          questionId: r.question_id,
          questionText: r.question_text,
          choices: [],
        };
        quizzesMap.set(r.question_id, entry);
      }
      // LEFT JOINなので choice が無い行に注意
      if (r.choice_id !== null) {
        entry.choices.push({
          id: r.choice_id,
          text: r.choice_text ?? "",
          isCorrect: !!r.is_correct,
        });
      }
    }

    res.json([...quizzesMap.values()]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});



export default router;