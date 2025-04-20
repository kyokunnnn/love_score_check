import { useNavigate, useParams } from "react-router-dom";
import { Choice, QuestionWithChoices } from "../type/quizQuestion";
import { useEffect, useState } from "react";

const QuizQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionWithChoices | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  }, [id]);

  if (!question) return <p>読み込み中...</p>;
  
  const handleChoiceClick = (choice: Choice) => {
    navigate("/quiz/result", {
      state: {
        quizId: question.questionId,
        questionText: question.questionText,
        selectedChoice: choice.text,
        isCorrect: choice.isCorrect
      },
    });
  };

  return (
    <div>
      <h1>問題</h1>
      <p>{question.questionText}</p>
      <ul>
        {question.choices.map((choice) => (
          <li key={choice.id}>
            <button onClick={() => handleChoiceClick(choice)}>
              {choice.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
