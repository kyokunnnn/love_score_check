import { Router, Request, Response } from "express";
import pool from "../db";
import { ResultSetHeader } from "mysql2";

const router = Router();

// 📌 フィードバックを保存する
router.post("/", async (req: Request, res: Response) => {
  try {
    const { rating, user_name, comment_text } = req.body;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO site_feedbacks (rating, user_name, comment_text ) VALUES (?, ?, ?)",
      [rating, user_name, comment_text]
    );

    res.status(201).json({ id: result.insertId, message: "フィードバックを保存しました" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
