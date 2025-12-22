import Banner from '../../components/Home/Banner/Banner';
import CarouselPlugin from '../../components/Home/Banner/CarouselPlugin';
import Meals from '../../components/Home/Meals'
import TopMeals from '../../components/Home/TopMeals';
import Reviews from '../../components/Home/Reviews/Reviews';
const Home = () => {
  return (
    <div>
      {/* <Banner/> */}
      <CarouselPlugin/>
      <Meals/>
      {/* More components */}
      <TopMeals/>
      <Reviews/>
    </div>
  );
};

export default Home;
