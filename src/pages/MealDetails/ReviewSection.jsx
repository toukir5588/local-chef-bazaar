import React from "react";

const ReviewSection = ({ reviews }) => {
  return (
    <div className="mt-16 mb-10">
      {reviews.length > 0 ? (
        <div className=" flex flex-col gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={
                      rev.userImage ||
                      "https://i.ibb.co/mRpg6Ph/default-user.png"
                    }
                    alt={rev.userName}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-gray-50 group-hover:ring-amber-50 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-gray-800 text-lg leading-tight">
                    {rev.userName}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {new Date(rev.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                    Rating: {rev.rating}.0
                  </span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -top-2 -left-2 text-4xl text-gray-100 font-serif leading-none group-hover:text-amber-100 transition-colors">
                  “
                </span>
                <p className="text-gray-600 leading-relaxed italic relative z-10 pl-4 pr-2">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4 opacity-50">🥣</div>
          <h4 className="text-2xl font-black text-gray-400">No reviews yet!</h4>
          <p className="text-gray-500">
            Be the first one to share your culinary experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
