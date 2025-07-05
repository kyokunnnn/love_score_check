import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.container}>
        <h1>love score checker</h1>
        <button onClick={() => navigate('/category-select')}>スタート</button>
      </div>
      <div className={styles.footer}>
        <button onClick={() => navigate('/about')}>
          このサービスの作者紹介
        </button>
      </div>
    </div>
  );
};

export default MainPage;
