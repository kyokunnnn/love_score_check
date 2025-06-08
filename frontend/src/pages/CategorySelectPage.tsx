import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySelectPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        どのカテゴリーのクイズに挑戦しますか？
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            className="p-4 border rounded hover:bg-gray-100"
            onClick={() => navigate(`/quiz/${cat.id}`)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectPage;
