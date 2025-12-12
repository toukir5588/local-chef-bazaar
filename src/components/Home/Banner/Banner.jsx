import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/images/banner1.jpg";
import bannerImg2 from "../../../assets/images/banner2.jpg";
import bannerImg3 from "../../../assets/images/banner3.jpg";
import Container from "../../Shared/Container";

const carouselData = [
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

const Banner = () => {
  return (
    <Container>
      <Carousel autoPlay={true} infiniteLoop={true}>
        {carouselData.map((data) => {
         return (
            <div className="relative flex justify-center items-center min-h-[500px]">
            <div className="">
              <img className=" " src={data.image} />
            </div>
            <div className="absolute flex flex-col justify-center items-center z-10">
              <h1 className=" lg:text-6xl font-bold text-white">{data.title}</h1>
              <h1 className=" text-xl text-lime-500">{data.subTitle}</h1>
            </div>
          </div>
         )
        })}
      </Carousel>
    </Container>
  );
};

export default Banner;
