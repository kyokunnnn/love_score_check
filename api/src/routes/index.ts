import { Router } from "express";
import questionsRouter from "./questions";
import answersRouter from "./answers";
import quizChoices from "./quizChoices";
import quizResults from "./quizResults";

const router = Router();

// エンドポイントのルート
router.use("/questions", questionsRouter);
router.use("/answers", answersRouter);
router.use("/choices", quizChoices);
router.use("/quiz-results", quizResults);

export default router;