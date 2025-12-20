import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import UpdateReviewModal from './UpdateReviewModal'; // Assume you create a modal similar to your status modal

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['my-reviews', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-reviews/${user?.email}`);
            return data;
        },
    });

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            await axiosSecure.delete(`/review/${id}`);
            toast.success("Review deleted successfully!");
            refetch();
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map(review => (
                    <div key={review._id} className="card bg-base-100 shadow-xl border p-5">
                        <h3 className="font-bold text-xl">{review.mealName}</h3>
                        <p className="text-yellow-500 font-bold">Rating: ★ {review.rating}</p>
                        <p className="text-gray-600 mt-2">"{review.comment}"</p>
                        <p className="text-xs text-gray-400 mt-4">Posted on: {new Date(review.date).toLocaleDateString()}</p>
                        
                        <div className="card-actions justify-end mt-4">
                            <button 
                                onClick={() => { setSelectedReview(review); setIsModalOpen(true); }}
                                className="btn btn-sm btn-outline btn-info"
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => handleDelete(review._id)}
                                className="btn btn-sm btn-outline btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Modal for updating review */}
            {selectedReview && (
                <UpdateReviewModal 
                    isOpen={isModalOpen} 
                    closeModal={() => setIsModalOpen(false)} 
                    review={selectedReview} 
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default MyReviews;