import { Router, Request, Response } from "express";
import pool from "../db";
import { ResultSetHeader } from "mysql2";

const router = Router();

// 📌 回答を保存する
router.post("/", async (req: Request, res: Response) => {
  try {
    const { quiz_id, selected_choice_id, is_correct } = req.body;
    
    // 仮の session_id を使用（後ほど実装に）
    const session_id = 123;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO quiz_results (quiz_id, selected_choice_id, is_correct, session_id) VALUES (?, ?, ?, ?)",
      [quiz_id, selected_choice_id, is_correct ? 1 : 0, session_id]
    );

    res.status(201).json({ id: result.insertId, message: "回答を保存しました" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
