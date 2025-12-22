import React from "react";
import { FaStar, FaTrash, FaEdit, FaClock, FaIdBadge } from "react-icons/fa";
import { Link } from "react-router"; 

const ChefMealCard = ({ meal, handleDelete }) => {
  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    ingredients,
    estimatedDeliveryTime, 
    chefName,
    chefId,
  } = meal;

  return (
    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col hover:shadow-2xl transition-all group">
      {/* Food Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <FaStar className="text-amber-500" />
          <span className="font-bold text-gray-800">{rating || "N/A"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-black text-gray-800 leading-tight">
            {foodName}
          </h3>
          <span className="text-amber-600 font-black text-lg">${price}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          <span className="font-bold text-gray-700">Ingredients:</span>{" "}
          {ingredients}
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 py-2">
          <div className="flex items-center gap-1 border-r pr-3">
            <FaClock className="text-amber-500" />
            {estimatedDeliveryTime} mins
          </div>
          <div className="flex items-center gap-1">
            <FaIdBadge className="text-amber-500" />
            Chef ID: {chefId || "Pending"}
          </div>
        </div>

        <p className="text-sm text-gray-600 italic">Created by: {chefName}</p>
      </div>

      {/* Actions */}
      <div className="p-4 bg-gray-50 flex gap-3">
        
        <Link
          to={`/dashboard/update-meal/${_id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-amber-500 text-amber-500 font-bold py-2 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-md"
        >
          <FaEdit /> Update
        </Link>
        <button
          onClick={() => handleDelete(_id)}
          className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 font-bold py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all border-2 border-red-100 hover:border-red-500"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default ChefMealCard;