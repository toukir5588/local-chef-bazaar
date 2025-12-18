import React from "react";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const MealDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meal/${id}`);
      return result.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  const {
    foodImage,
    foodName,
    longDescription,
    Category,
    quantity,
    price,
    chefName,
    chefImage,
    rating,
    chefId,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
  } = meal;
  // console.log(meal);

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 py-10">
        {/* Left Side: Food Image */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100">
            <img
              className="object-cover w-full h-[400px] lg:h-[500px] hover:scale-105 transition duration-500"
              src={foodImage}
              alt={foodName}
            />
          </div>

          {/* Ingredients Section */}
          {ingredients && (
            <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-yellow-600/30">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Ingredients:
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-yellow-600 text-yellow-700 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Information */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <Heading title={foodName} />
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold">
              ★ {rating}
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Description */}
          <div className="text-lg text-neutral-600 leading-relaxed">
            {longDescription}
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Chef Section */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50/50 border border-yellow-100">
            <img
              className="rounded-full object-cover border-2 border-yellow-600"
              height="60"
              width="60"
              alt="Chef"
              src={chefImage}
            />
            <div>
              <div className="text-lg font-bold text-gray-800">
                Chef: {chefName}
              </div>
              <div className="text-sm text-gray-500 italic">
                {chefExperience}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500 text-sm">Delivery Time</p>
              <p className="font-bold text-gray-800">
                🕒 {estimatedDeliveryTime}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500 text-sm">Available Quantity</p>
              <p className="font-bold text-gray-800">📦 {quantity} Units</p>
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Price and Purchase Button */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm font-medium">
                Total Price
              </span>
              <span className="font-extrabold text-4xl text-yellow-600">
                ${price}
              </span>
            </div>

            <div className="w-1/2">
              <Button onClick={() => setIsOpen(true)} label="Order Now" />
            </div>
          </div>

          <PurchaseModal meal={meal} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  );
};

export default MealDetails;
