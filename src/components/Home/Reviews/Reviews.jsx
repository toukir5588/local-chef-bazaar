import React from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Reviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/reviews`);
      // console.log(result.data);
      return result.data;
    },
  });
  console.log(reviews);

  return (
    <div className="my-24">
      <div className="text-center mb-24">
        <h3 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 ">
          Reviews
        </h3>
        <p className="max-w-[600px] text-center mx-auto text-gray-600">
          I am amazed by the chef's expertise. The balance of spices and the
          texture of the meal were perfect. Plus, the delivery was right on time
          and the food was still steaming hot!
        </p>
      </div>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
