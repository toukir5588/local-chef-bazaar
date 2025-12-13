import React from 'react';
import { Link } from 'react-router';

const Card = ({meal}) => {
  // console.log(meal);
  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    chefName,
    estimatedDeliveryTime,
  } = meal || {};
 

  const displayRating = rating ? rating.toFixed(1) : 'N/A';
  const displayPrice = price ? price.toFixed(2) : 'N/A';
  const displayTime = estimatedDeliveryTime || '30-45 mins';
  const chef = chefName || 'Local Chef';

  const ACCENT_COLOR_CLASS = "yellow-600";
  const ACCENT_TEXT_COLOR = `text-${ACCENT_COLOR_CLASS}`;
  const ACCENT_BG_COLOR = `bg-${ACCENT_COLOR_CLASS}`;

  return (
    <div
      className={`
        col-span-1 
        group 
        p-4 
        rounded-xl 
        transition duration-300 
        shadow-lg 
        bg-white 
        hover:shadow-xl 
        hover:border-2 hover:border-${ACCENT_COLOR_CLASS} 
        border border-gray-100 
        overflow-hidden
      `}
    >
      <div className="flex flex-col gap-3 w-full">
        <div
          className="
              aspect-[4/3] 
              w-full 
              relative 
              overflow-hidden 
              rounded-lg
            "
        >
          <img
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition duration-500
              bg-gray-200
            "
            src={foodImage}
            alt={foodName}
          />
          <div
            className={`
              absolute
              top-3
              left-3
              ${ACCENT_BG_COLOR} 
              px-3 py-1 rounded-full text-sm font-bold 
              flex items-center gap-1 shadow-lg
              text-yellow-500
            `}
          >
            <span className="">★</span> {displayRating}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="font-bold text-lg text-gray-800 truncate mt-1">
            {foodName}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="font-medium text-gray-700">🧑‍🍳 {chef}</span>
            <span>⏳ {displayTime}</span>
          </div>

          <hr className="my-2 border-gray-100" />

          <div className="flex justify-between items-center">
            <div className={`font-extrabold text-2xl ${ACCENT_TEXT_COLOR}`}>
              ${displayPrice}
            </div>

            <Link className='border-2 text-sm hover:bg-amber-500 hover:text-white  border-yellow-600 py-2 px-3 rounded-sm font-bold' to={`/meal/${_id}`}>See Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;