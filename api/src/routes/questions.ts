import { Router } from "express";
import pool from "../db";
import { RowDataPacket } from "mysql2";

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

type QuizChoiceRow = {
  question_id: number;
  question_text: string;
  choice_id: number;
  choice_text: string;
} & RowDataPacket;
// 特定の質問を選択肢付きで取得
router.get("/:id", async (req, res) => {
  try {
    const quizId = Number(req.params.id);

    const [rows] = await pool.query(
      `
      SELECT
        q.id AS question_id,
        q.text AS question_text,
        c.id AS choice_id,
        c.choice_text AS choice_text
      FROM questions q
      LEFT JOIN quiz_choices c ON q.id = c.quiz_id
      WHERE q.id = ?
      `,
      [quizId]
    ) as unknown as QuizChoiceRow[];

    // 整形してクライアントに返す形式にする
    const question = {
      questionId: rows[0].question_id,
      questionText: rows[0].question_text,
      choices: rows.map((row: any) => ({
        id: row.choice_id,
        text: row.choice_text,
      }))
    };

    res.json(question);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;