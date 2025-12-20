import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

// Components & Hooks
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import ReviewModal from "../../components/Modal/ReviewModal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewSection from "./ReviewSection";

const MealDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const {
    data: meal = {},
    isLoading,
    refetch: mealRefetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meal/${id}`);
      return result.data;
    },
  });

  const { data: reviews = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["meal-reviews", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/all-reviews`);
      return result.data.filter((rev) => rev.mealId === id);
    },
  });

  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating =
    reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "New";

  if (isLoading) return <LoadingSpinner />;

  const {
    _id,
    foodImage,
    foodName,
    longDescription,
    quantity,
    price,
    chefName,
    chefImage,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
  } = meal;

  const handleAddToFavorite = async () => {
    if (!user) return toast.error("Please login to save favorites!");
    const favoriteData = {
      mealId: _id,
      foodName,
      chefName,
      price,
      foodImage, 
      userEmail: user?.email,
      dateAdded: new Date(),
    };

    try {
      await axiosSecure.post("/favorites", favoriteData);
      toast.success("Added to your favorites! ❤️");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already in favorites");
    }
  };

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 py-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="relative group w-full overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
            <img
              className="object-cover w-full h-[400px] lg:h-[550px]"
              src={foodImage}
              alt={foodName}
            />
            <button
              onClick={handleAddToFavorite}
              className="absolute top-6 right-6 p-4 bg-white/90 text-2xl rounded-full shadow-lg hover:scale-110 transition"
            >
              ❤️
            </button>
          </div>
          {ingredients && (
            <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100">
              <h3 className="text-xl font-bold mb-4">🥗 Key Ingredients</h3>
              <div className="flex flex-wrap gap-3">
                {ingredients.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-white border border-orange-200 text-orange-800 rounded-full text-sm font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* comment section */}
          <div>
            <ReviewSection reviews={reviews} averageRating={averageRating} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <Heading title={foodName} />
            <div className="text-right">
              <div className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-2xl font-black shadow-md text-xl">
                ★ {averageRating}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {reviews.length} Reviews
              </p>
            </div>
          </div>
          <hr className="my-8 border-gray-100" />
          <div className="text-lg text-neutral-600 italic">
            "{longDescription}"
          </div>
          <hr className="my-8 border-gray-100" />

          <div className="flex items-center gap-5 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <img
              className="rounded-2xl border-4 border-white shadow-md h-20 w-20 object-cover"
              src={chefImage}
              alt="Chef"
            />
            <div>
              <div className="text-xl font-bold">Chef {chefName}</div>
              <div className="text-sm text-gray-500 uppercase">
                {chefExperience} Experience
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="p-4 bg-blue-50 rounded-2xl text-center">
              <span className="text-2xl">🕒</span>
              <p className="font-bold">{estimatedDeliveryTime}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl text-center">
              <span className="text-2xl">📦</span>
              <p className="font-bold">{quantity} Left</p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-end mb-8 mt-8">
              <div>
                <span className="text-gray-400 text-sm uppercase font-bold">
                  Price
                </span>
                <p className="font-black text-5xl">${price}</p>
              </div>
              <div className="w-1/2">
                <Button
                  onClick={() => setIsPurchaseOpen(true)}
                  label="Place Order Now"
                />
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl border border-yellow-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-800">Enjoyed the meal?</h4>
                <p className="text-sm text-gray-500">Add your rating now!</p>
              </div>
              <button
                onClick={() => setIsReviewOpen(true)}
                className="px-6 py-2 bg-white border-2 border-yellow-500 text-yellow-600 font-bold rounded-xl hover:bg-yellow-500 hover:text-white transition"
              >
                Add Review ⭐
              </button>
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal
        meal={meal}
        closeModal={() => setIsPurchaseOpen(false)}
        isOpen={isPurchaseOpen}
      />
      <ReviewModal
        meal={meal}
        user={user}
        isOpen={isReviewOpen}
        closeModal={() => setIsReviewOpen(false)}
        refetch={() => {
          mealRefetch();
          reviewRefetch();
        }}
      />
    </Container>
  );
};

export default MealDetails;
