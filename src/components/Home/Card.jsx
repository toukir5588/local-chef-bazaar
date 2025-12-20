import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router';

const Card = ({ meal }) => {
  const {
    _id,
    foodName,
    foodImage,
    price,
    chefName,
    estimatedDeliveryTime,
  } = meal || {};

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/all-reviews`);
      return result.data;
    },
  });

  const mealReviews = reviews.filter(rev => rev.mealId === _id);
  const totalRating = mealReviews.reduce((sum, rev) => sum + (rev.rating || 0), 0);
  const averageRating = mealReviews.length > 0 ? (totalRating / mealReviews.length).toFixed(1) : 'New';

  const displayPrice = price ? price.toFixed(2) : 'N/A';
  const displayTime = estimatedDeliveryTime || '30-45 mins';
  const chef = chefName || 'Local Chef';

  const ACCENT_TEXT_COLOR = `text-amber-600`;
  const ACCENT_BORDER_COLOR = `border-amber-600`;

  return (
    <div
      className={`
        col-span-1 group p-4 rounded-xl transition duration-300 shadow-lg 
        bg-white hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full 
      `}
    >
      <div className="flex flex-col gap-3 w-full h-full flex-grow">
        {/* Image Section */}
        <div className="aspect-[4/3] w-full relative overflow-hidden rounded-lg bg-gray-100">
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition duration-500"
            src={foodImage}
            alt={foodName}
          />
          <div className="absolute top-3 left-3 bg-amber-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg text-white">
            <span>★</span> {averageRating}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow">
          <div className="font-bold text-lg text-gray-800 mt-1 mb-1 line-clamp-2 h-[3.5rem]">
            {foodName || "Unnamed Meal"}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
            <span className="font-medium text-gray-700 truncate max-w-[120px]">
              🧑‍🍳 {chef}
            </span>
            <span className="flex-shrink-0">⏳ {displayTime}</span>
          </div>

          <hr className="my-3 border-gray-100" />

          <div className="flex justify-between items-center mt-auto">
            <div className={`font-extrabold text-xl ${ACCENT_TEXT_COLOR}`}>
              ${displayPrice}
            </div>

            <Link 
              className={`border-2 text-xs hover:bg-amber-600 hover:text-white ${ACCENT_BORDER_COLOR} py-2 px-3 rounded-md font-bold transition-colors`} 
              to={`/meal/${_id}`}
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;