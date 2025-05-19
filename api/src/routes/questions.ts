import { Router } from "express";
import pool from "../db";
import { QuizChoiceRow } from "../type/questions";

const router = Router();

// 特定の質問を選択肢付きで取得
router.get("/:id", async (req, res) => {
  try {
    const quizId = Number(req.params.id);

    const [rows] = await pool.query<QuizChoiceRow[]>(
      `
      SELECT
        q.id AS question_id,
        q.text AS question_text,
        c.id AS choice_id,
        c.choice_text AS choice_text,
        c.is_correct AS is_correct
      FROM questions q
      LEFT JOIN quiz_choices c ON q.id = c.quiz_id
      WHERE q.id = ?
      `,
      [quizId]
    )

    // 整形してクライアントに返す形式にする
    const question = {
      questionId: rows[0].question_id,
      questionText: rows[0].question_text,
      choices: rows.map((row: any) => ({
        id: row.choice_id,
        text: row.choice_text,
        isCorrect: row.is_correct,
      }))
    };

    res.json(question);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// カテゴリー毎に複数のクイズと選択肢をまとめて取得
router.get("/", async (req, res) => {
  const categoryId = Number(req.query.category);
  try {
    const [rows] = await pool.query<QuizChoiceRow[]>(
      `
      SELECT
        q.id AS question_id,
        q.text AS question_text,
        c.id AS choice_id,
        c.choice_text,
        c.is_correct
      FROM questions q
      LEFT JOIN quiz_choices c ON q.id = c.quiz_id
      WHERE q.category = ?
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

    for (const row of rows) {
      if (!quizzesMap.has(row.question_id)) {
        quizzesMap.set(row.question_id, {
          questionId: row.question_id,
          questionText: row.question_text,
          choices: [],
        });
      }

      quizzesMap.get(row.question_id)!.choices.push({
        id: row.choice_id,
        text: row.choice_text,
        isCorrect: row.is_correct,
      });
    }

    res.json(Array.from(quizzesMap.values()));
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});


export default router;