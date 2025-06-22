import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Choice, QuestionWithChoices } from '../type/quizQuestion';

const QuizByCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId, questionIndex } = useParams();
  const [quizzes, setQuizzes] = useState<QuestionWithChoices[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/questions?category=${categoryId}`)
      .then((res) => res.json())
      .then(setQuizzes);
  }, [categoryId]);

  const currentIndex = Number(questionIndex) || 0;
  const quiz = quizzes[currentIndex];

  console.log('取得したクイズ群', quizzes);
  if (quizzes.length === 0) return <p>読み込み中...</p>;

  const handleChoiceClick = (choice: Choice) => {
    navigate('/quiz/result', {
      state: {
        quizId: quiz.questionId,
        questionText: quiz.questionText,
        selectedChoice: choice.text,
        isCorrect: choice.isCorrect,
        quizzes, // 全体のクイズ配列
        currentIndex, // 現在のインデックス
        categoryId, // 必要ならカテゴリーIDも
      },
    });
  };

  return (
    <div>
      <h2>
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
    </div>
  );
};

export default QuizByCategoryPage;
