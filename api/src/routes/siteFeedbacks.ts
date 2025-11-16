import { Router, Request, Response } from "express";
import { pool } from "../db";
import { SiteFeedbackInsertedRow } from "../type/siteFeedbacks";

const router = Router();

// 📌 フィードバックを保存する
router.post("/", async (req: Request, res: Response) => {
  try {
    const { rating, user_name, comment_text } = req.body;

    const { rows: [inserted] } = await pool.query<SiteFeedbackInsertedRow>(
      `INSERT INTO site_feedbacks (rating, user_name, comment_text)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [rating, user_name ?? null, comment_text ?? null]
    );

    res.status(201).json({ id: inserted.id, message: "フィードバックを保存しました" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
