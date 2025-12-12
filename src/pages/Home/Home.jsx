import Banner from '../../components/Home/Banner/Banner';
import CarouselPlugin from '../../components/Home/Banner/CarouselPlugin';
import Meals from '../../components/Home/Meals'
const Home = () => {
  return (
    <div>
      {/* <Banner/> */}
      <CarouselPlugin/>
      <Meals/>
      {/* More components */}
    </div>
  );
};

export default Home;
