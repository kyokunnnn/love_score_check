import { Router } from "express";
import questionsRouter from "./questions";
import answersRouter from "./answers";
import quizChoices from "./quizChoices";
import quizResults from "./quizResults";
import categories from "./categories";
import feedbacks from "./siteFeedbacks";

const router = Router();

// エンドポイントのルート
router.use("/questions", questionsRouter);
router.use("/answers", answersRouter);
router.use("/choices", quizChoices);
router.use("/quiz-results", quizResults);
router.use("/categories", categories);
router.use("/feedbacks", feedbacks);

export default router;