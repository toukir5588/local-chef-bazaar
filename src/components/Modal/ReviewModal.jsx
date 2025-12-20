import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ isOpen, closeModal, meal, user, refetch }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const axiosSecure = useAxiosSecure();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a star rating!");

    const reviewData = {
      mealId: meal._id,
      mealName: meal.foodName,
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      rating: rating,
      comment: e.target.comment.value,
      date: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      toast.success("Thank you for your review! ⭐");
      e.target.reset(); // ফর্ম রিসেট
      setRating(0);    // স্টার রিসেট
      refetch();       // ডাটা রিলোড
      closeModal();
    } catch (err) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-xl font-bold text-gray-900">Rate your experience</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Reviewing: {meal?.foodName}</p>

                <form onSubmit={handleReviewSubmit} className="mt-6">
                  <div className="flex flex-col items-center gap-2 mb-6">
                    <span className="text-sm font-medium text-gray-600">How was the meal?</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className={`text-4xl transition ${star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
                          onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}> ★ </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Your Comment</label>
                    <textarea name="comment" required rows="4" placeholder="Share your thoughts..." className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 outline-none"></textarea>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm text-white bg-yellow-600 rounded-lg hover:bg-yellow-700">Submit Review</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewModal;