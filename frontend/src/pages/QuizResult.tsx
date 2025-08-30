import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Answer } from '../type/quizResult';
import { Choice, QuestionWithChoices } from '../type/quizQuestion';

const QuizResult = () => {
  const { state } = useLocation() as {
    state?: {
      quizzes: QuestionWithChoices[];
      currentIndex: number;
      categoryId: string | number;
      score: number;
      isCorrect?: boolean;
      selectedChoice?: string;
    };
  };
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [correctChoice, setCorrectChoice] = useState<Choice | null>(null);

  // state なしで直接アクセスされた場合のガード
  if (!state) {
    navigate('/', { replace: true });
    return null;
  }

  // quizzes/currentIndex から quizId を導出
  const currentQuiz = state.quizzes[state.currentIndex];
  const quizId = currentQuiz?.questionId;

  // ここで初めて +1
  const newScore = state.score + (state.isCorrect ? 1 : 0);

  // 並列で取得（Promise.all）
  useEffect(() => {
    if (!quizId) return;

    let cancelled = false;

    (async () => {
      try {
        const [ansRes, correctRes] = await Promise.all([
          fetch(`http://localhost:3000/api/answers/${quizId}`),
          fetch(`http://localhost:3000/api/choices/correct-choice/${quizId}`),
        ]);

        const ansJson = await ansRes.json();
        const correctJson = await correctRes.json();

        if (!cancelled) {
          // API が配列返すなら data[0]、オブジェクトならそのまま
          setAnswer(Array.isArray(ansJson) ? ansJson[0] : ansJson);
          setCorrectChoice(correctJson ?? null);
        }
      } catch (e) {
        if (!cancelled) {
          setAnswer(null);
          setCorrectChoice(null);
        }
      }
    })();

    return () => {
      cancelled = true; // アンマウント時の競合対策
    };
  }, [quizId]);

  // 一回のクイズで何問出すかの上限数
  const QUESTION_LIMIT = 5;

  const handleNext = () => {
    const nextIndex = state.currentIndex + 1;
    const endByLimit =
      nextIndex >= QUESTION_LIMIT || nextIndex >= state.quizzes.length;
    if (!endByLimit) {
      navigate(`/quiz/${state.categoryId}/${nextIndex}`, {
        state: {
          ...state,
          currentIndex: nextIndex,
          score: newScore,
        },
      });
    } else {
      navigate('/end', {
        state: { score: state.score, categoryId: state.categoryId },
      });
    }
  };

  return (
    <div>
      <h1>結果</h1>
      <h2>{state.isCorrect ? '⭕ 正解！' : '❌ 不正解...'}</h2>

      <p>問題: {currentQuiz?.questionText}</p>
      <p>選択した答え: {state.selectedChoice}</p>

      {correctChoice ? (
        <p>正解：{correctChoice.text}</p>
      ) : (
        <p>正解を読み込み中…</p>
      )}
      {answer ? <p>解説：{answer.text}</p> : <p>解説を読み込み中…</p>}

      <button onClick={() => navigate('/category-select')}>
        カテゴリー選択画面に戻る
      </button>
      <button onClick={handleNext}>次の問題へ →</button>
    </div>
  );
};

export default QuizResult;
