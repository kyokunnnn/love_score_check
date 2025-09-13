import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategorySelectPage.module.css';
import { Home } from 'lucide-react';

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
      <p>※今後さらに質問や機能は追加予定です</p>
      <p>
        ※本サービスの内容は正確性や完全性を保証するものではありません。
        <br />
        個人差があり、最終的な判断は利用者ご自身の責任でお願いいたします。
      </p>
      <div>
        {categories.map((cat: any) => (
          <button key={cat.id} onClick={() => navigate(`/quiz/${cat.id}/0`)}>
            {cat.name}
          </button>
        ))}
      </div>
      <button className={styles.home_button} onClick={() => navigate('/')}>
        <Home strokeWidth={1} />
        ホームへ戻る
      </button>
    </div>
  );
};

export default CategorySelectPage;
