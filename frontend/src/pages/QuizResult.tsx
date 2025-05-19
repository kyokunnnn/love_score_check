import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Answer } from "../type/quizResult";
import { Choice } from "../type/quizQuestion";

const QuizResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [correctChoice, setCorrectChoice] = useState<Choice | null>(null);

  useEffect(() => {
    if (!state?.quizId) return;

    fetch(`http://localhost:3000/api/answers/${state.quizId}`)
      .then((res) => res.json())
      .then((data) => {
        // dataが配列で返ってくる想定なら data[0]
        setAnswer(data[0]);
      });
  }, [state?.quizId]);

  useEffect(() => {
    if (!state?.quizId) return;
  
    fetch(`http://localhost:3000/api/choices/correct-choice/${state.quizId}`)
      .then((res) => res.json())
      .then((data) => setCorrectChoice(data));
  }, [state?.quizId]);

  if (!state) {
    // データがない場合はクイズ画面に戻す
    navigate("/quiz");
    return null;
  }

  const handleNext = () => {
    const nextId = Number(state.quizId) + 1;
    if (nextId > 10) {
      navigate("/end");
    } else {
      navigate(`/quiz/${nextId}`);
    }
  };

  return (
    <div>
      <h1>結果</h1>
      <p>問題: {state.questionText}</p>
      <p>あなたの答え: {state.selectedChoice}</p>
      <p>{state.isCorrect ? "⭕ 正解！" : "❌ 不正解..."}</p>
      {correctChoice && <p>正解の選択肢：{correctChoice.text}</p>}
      {answer && <p>解説：{answer.text}</p>}
      <button onClick={() => navigate("/quiz/1")}>トップに戻る</button>
      <button onClick={handleNext}>次の問題へ →</button>
    </div>
  );
};

export default QuizResult;
