import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Choice, QuestionWithChoices } from '../type/quizQuestion';

const QuizByCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [quizzes, setQuizzes] = useState<QuestionWithChoices[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/questions?category=${categoryId}`)
      .then((res) => res.json())
      .then(setQuizzes);
  }, [categoryId]);

  console.log('取得したクイズ群', quizzes);
  if (quizzes.length === 0) return <p>読み込み中...</p>;

  const quiz = quizzes[currentIndex];

  const handleChoiceClick = (choice: Choice) => {
    const quiz = quizzes[currentIndex];

    navigate('/quiz/result', {
      state: {
        quizId: quiz.questionId,
        questionText: quiz.questionText,
        selectedChoice: choice.text,
        isCorrect: choice.isCorrect,
      },
    });
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Q{currentIndex + 1}: {quiz.questionText}
      </h2>

      <ul>
        {quiz.choices.map((choice) => (
          <li key={choice.id}>
            <button onClick={() => handleChoiceClick(choice)}>
              {choice.text}
            </button>
          </li>
        ))}
      </ul>

      {showAnswer && (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleNext}
          disabled={currentIndex + 1 >= quizzes.length}
        >
          {currentIndex + 1 < quizzes.length ? '次へ' : '終了'}
        </button>
      )}
    </div>
  );
};

export default QuizByCategoryPage;
