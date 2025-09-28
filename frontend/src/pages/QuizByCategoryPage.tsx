import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Choice, QuestionWithChoices } from '../type/quizQuestion';
import { Home } from 'lucide-react';
import styles from './QuizByCategoryPage.module.css';
import { http } from '../lib/http';

const QuizByCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId, questionIndex } = useParams();
  const [quizzes, setQuizzes] = useState<QuestionWithChoices[]>([]);
  const { state } = useLocation() as { state?: { score?: number } };
  const baseScore = state?.score ?? 0;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 推奨：params で渡す（自動エンコード）
      const { data } = await http.get<QuestionWithChoices[]>('/api/questions', {
        params: { category: String(categoryId) },
      });

      // Fisher–Yatesでシャッフル
      const a = [...data];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }

      const LIMIT = 5;
      const picked = a.slice(0, Math.min(LIMIT, a.length));

      if (!cancelled) setQuizzes(picked);
    })();

    return () => {
      cancelled = true;
    };
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
        score: baseScore, // スコアの計算
      },
    });
  };

  return (
    <div>
      <h2 className={styles.question_text}>
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
      <div className={styles.center_wrapper}>
        <button className={styles.home_button} onClick={() => navigate('/')}>
          <Home strokeWidth={1} />
          ホームへ戻る
        </button>
      </div>
    </div>
  );
};

export default QuizByCategoryPage;
