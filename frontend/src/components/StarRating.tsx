import { Star } from 'lucide-react';

type Props = {
  rating: number;
  setRating: (value: number) => void;
};

const StarRating = ({ rating, setRating }: Props) => {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label={`${star} star`}
        >
          <Star
            size={30}
            strokeWidth={1.5}
            fill={star <= rating ? '#black' : 'lightgrey'}
            color="#black"
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
