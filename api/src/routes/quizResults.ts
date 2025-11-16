import { Router, Request, Response } from "express";
import { pool } from "../db";
import { quizResultInsertedIdRow } from "../type/quizResults";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { quiz_id, selected_choice_id } = req.body as {
      quiz_id: number; selected_choice_id: number;
    };
    const session_id = 123; // TODO: 本実装に置き換え

    // まず選択肢が対象クイズに属しているか＆正誤を取得（サーバ側で判定）
    const { rows: [choice] } = await pool.query<{ is_correct: boolean }>(
      `SELECT is_correct
         FROM quiz_choices
        WHERE id = $1 AND quiz_id = $2 AND deleted_at IS NULL
        LIMIT 1`,
      [selected_choice_id, quiz_id]
    );
    if (!choice) {
      res.status(400).json({ error: "invalid choice for this quiz" });
      return;
    }

    // 保存（スキーマに is_correct 列が無いので入れない）
    const { rows: [inserted] } = await pool.query<quizResultInsertedIdRow>(
      `INSERT INTO quiz_results (quiz_id, selected_choice_id, session_id)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [quiz_id, selected_choice_id, session_id]
    );

    res.status(201).json({
      id: inserted.id,
      message: "回答を保存しました",
      is_correct: choice.is_correct, // レスポンスで返すだけ
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});


export default router;
