import { Router } from "express";
import pool from "../db";

const router = Router();

// 全てのカテゴリーを取得
router.get("/", async (_, res) => {
  try {
    const {rows} = await pool.query<CategoryResponse>("SELECT * FROM categories");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
