"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bannerImg1 from "../../../assets/images/banner1.jpg";
import bannerImg2 from "../../../assets/images/banner2.jpg";
import bannerImg3 from "../../../assets/images/banner3.jpg";
import Container from "../../Shared/Container";
import AnimationY from "../../Shared/Animation/AnimationY";
import Button from "../../Shared/Button/Button";

const slidesData = [
  {
    id: 1,
    image: bannerImg1,
    title: "Taste the Local Magic.",
    subTitle:
      "Discover the heart and soul of your neighborhood's best home-cooked meals, crafted by local chefs.",
  },
  {
    id: 2,
    image: bannerImg2,
    title: "Fresh Flavors, Delivered Fast.",
    subTitle:
      "Skip the restaurant hassle. Order authentic, freshly prepared dishes from nearby culinary experts.",
  },
  {
    id: 1,
    image: bannerImg3,
    title: "Connect with Your Kitchen Heroes.",
    subTitle:
      "Support local talent and enjoy unique, high-quality recipes straight from their kitchens to your door.",
  },
];

export default function CarouselPlugin() {
  // const heroSlog = (
  //   <div className={`text-left space-y-1.5 md:space-y-4 my-6 md:my-10 ${sloganTextColor}`}>
  //     <AnimationLTR>
  //       <h3 className="text-xl md:text-2xl font-serif">TIMELESS STYLE</h3>
  //     </AnimationLTR>
  //     <AnimationRTL>
  //       <h1 className="text-3xl md:text-5xl font-bold leading-tight">
  //         Discover Watches That <br className="hidden md:inline"/> Define Elegance
  //       </h1>
  //     </AnimationRTL>
  //     <AnimationLTR>
  //       <p className="text-base md:text-xl font-medium max-w-sm md:max-w-none">
  //         From classic leather to modern smart designs, explore our curated <br className="hidden md:inline"/> collection for every wrist.
  //       </p>
  //     </AnimationLTR>
  //     <AnimationRTL>
  //       <button className={`btn ${buttonBgColor} ${buttonTextColor} hover:bg-[#a8741a] border-none mt-3 md:mt-5`}>
  //         SHOP NOW →
  //       </button>
  //     </AnimationRTL>
  //   </div>
  // );

  return (
    <div className="w-screen">
      <AnimationY>
        <Swiper
          className="h-[350px] sm:h-[450px] lg:h-[600px] w-full"
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div id={`slide${slide.id}`} className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center text-center px-5 md:px-10">
                  <div className="flex justify-center items-center space-y-6 flex-col">
                    <h1 className="text-3xl lg:text-5xl font-bold  text-white">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-lime-500">{slide.subTitle}</p>
                    <div className="">
                      <Button label={"Explore Now"}  outline={true} ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </AnimationY>
    </div>
  );
}
