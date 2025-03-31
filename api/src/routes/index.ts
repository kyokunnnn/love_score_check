import { Router } from "express";
import questionsRouter from "./questions";
import answersRouter from "./answers";
import quizChoices from "./quizChoices";

const router = Router();

// エンドポイントのルート
router.use("/questions", questionsRouter);
router.use("/answers", answersRouter);
router.use("/quiz-choices", quizChoices);

export default router;