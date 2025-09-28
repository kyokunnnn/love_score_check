import { useState } from 'react';
import StarRating from '../components/StarRating';
import styles from './SiteFeedbacks.module.css';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { http } from '../lib/http';

const FeedbackForm = () => {
  const [rating, setRating] = useState<number>(5);
  const [userName, setUserName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await http.post('/api/feedbacks', {
        rating,
        user_name: userName,
        comment_text: commentText,
      });
      setMessage('フィードバックありがとうございます！');
      setRating(5);
      setUserName('');
      setCommentText('');
    } catch (error) {
      console.error(error);
      setMessage('送信に失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.feedbackForm}>
      <h2>フィードバックを送る</h2>

      <label>
        評価:
        <StarRating rating={rating} setRating={setRating} />
      </label>

      <label>
        お名前（任意）:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="匿名でもOK"
        />
      </label>

      <label>
        コメント:
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={5}
        />
      </label>

      <button type="submit">送信</button>

      {message && <p>{message}</p>}
      <button className={styles.home_button} onClick={() => navigate('/')}>
        <Home strokeWidth={1} />
        ホームへ戻る
      </button>
    </form>
  );
};

export default FeedbackForm;
