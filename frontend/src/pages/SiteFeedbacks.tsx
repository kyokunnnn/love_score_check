import { useState } from 'react';
import axios from 'axios';
import StarRating from '../components/StarRating';
import styles from './SiteFeedbacks.module.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState<number>(5);
  const [userName, setUserName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/feedbacks', {
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
    </form>
  );
};

export default FeedbackForm;
