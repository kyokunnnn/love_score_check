import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionWithChoices } from "../type/question";
import QuizQuestion from "./quizQuestion";

const QuizList = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionWithChoices | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  }, [id]);

  if (!question) return <p>読み込み中...</p>;

  return <QuizQuestion question={question} />;
};

export default QuizList;
