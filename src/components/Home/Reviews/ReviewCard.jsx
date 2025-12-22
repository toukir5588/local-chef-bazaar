import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    // Destructuring with fallback values to prevent errors
    const { 
        userName = "Anonymous User", 
        comment: testimonial, 
        userImage: user_photoURL 
    } = review || {};

    return (
        <div className="max-w-sm bg-white shadow-md hover:shadow-xl rounded-2xl p-6 border border-gray-100 transition-all duration-300 group">
            {/* Quote Icon - Matching your Amber theme */}
            <div className="bg-amber-50 w-12 h-12 flex items-center justify-center rounded-full mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <FaQuoteLeft className="text-amber-600 text-xl group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Review Text */}
            <p className="text-gray-600 leading-relaxed italic mb-6">
                "{testimonial || "The food was absolutely delicious and the service was top-notch!"}"
            </p>

            {/* Divider - Clean and subtle */}
            <div className="border-t border-dashed border-amber-100 my-5"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img 
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-100 ring-offset-2 shadow-sm" 
                        src={user_photoURL || "https://i.ibb.co/mRpg6Ph/default-user.png"} 
                        alt={userName} 
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-base">{userName}</h3>
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Food Enthusiast</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;