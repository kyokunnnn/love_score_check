import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import { BookHeart, User, Mars, MessageCircleMore } from 'lucide-react';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.rightAlign}>
        <button
          className={styles.aboutAuthorButton}
          onClick={() => navigate('/about')}
        >
          このサービスの作者紹介
          <User size={25} strokeWidth={1} />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.tag}>
          男性のための
          <Mars size={15} />
        </div>
        <h1>
          モテチェッカー
          <BookHeart size={35} />
        </h1>
        <button onClick={() => navigate('/category-select')}>スタート</button>
      </div>
      <div>
        <MessageCircleMore size={20} />
        お問い合わせや感想は<a href="/site-feedbacks">こちら</a>
        からお願い致します
      </div>
    </div>
  );
};

export default MainPage;
