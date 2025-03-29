import { Router } from "express";
import questionsRouter from "./questions";

const router = Router();

// エンドポイントのルート
router.use("/questions", questionsRouter);

export default router;