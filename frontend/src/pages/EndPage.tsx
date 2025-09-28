import { useLocation, useNavigate } from 'react-router-dom';

const EndPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { score?: number; categoryId?: string | number };
  };
  const score = state?.score ?? 0;

  return (
    <div>
      <h1>お疲れさまでした！</h1>
      <p>あなたのスコア: {score} / 5</p>
      <button onClick={() => navigate('/')}>トップへ戻る</button>
      <button
        onClick={() =>
          navigate(`/quiz/${state?.categoryId}/0`, {
            state: { score: 0 }, // 再挑戦時にリセット（必要に応じて他も）
          })
        }
      >
        もう一度挑戦
      </button>
    </div>
  );
};

export default EndPage;
