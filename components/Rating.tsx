import React from 'react';
import { StarIcon } from './icons/StarIcon';

interface RatingProps {
  value: number;
  singleStar?: boolean;
}

export const Rating: React.FC<RatingProps> = ({ value, singleStar = false }) => {
  const totalStars = singleStar ? 1 : 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-5 w-5 ${index < value ? 'text-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
};
