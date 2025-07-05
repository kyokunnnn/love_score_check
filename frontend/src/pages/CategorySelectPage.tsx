import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategorySelectPage.module.css';

const CategorySelectPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className={styles.container}>
      <h1>どのカテゴリーのクイズに挑戦しますか？</h1>
      <p>クイズには今の自分の正直で答えてください！</p>
      <p>各カテゴリーランダムに5問の質問です</p>
      <p>※今後さらに質問は追加予定です</p>
      <div>
        {categories.map((cat: any) => (
          <button key={cat.id} onClick={() => navigate(`/quiz/${cat.id}/1`)}>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectPage;
