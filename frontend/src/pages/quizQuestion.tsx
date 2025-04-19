import { useNavigate } from "react-router-dom";
import { Choice, QuestionWithChoices } from "../type/question";

type QuizQuestionProps = {
  question: QuestionWithChoices;
};

const QuizQuestion = ({ question }: QuizQuestionProps) => {
  const navigate = useNavigate();

  const handleChoiceClick = (choice: Choice) => {
    navigate("/result", {
      state: {
        questionText: question.questionText,
        selectedChoice: choice.text,
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
