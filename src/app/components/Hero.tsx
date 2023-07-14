import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { HeroSwiper } from "./HeroSwiper";
import HowItWorks from "./HowItWorks";
import { getEvents } from "../functions/functions";
import { FeaturedEvents } from "./FeaturedEvents";

export default async function Hero() {
  const data = await getEvents();
  return (
    <>
      <HeroSwiper data={...data.results} />
      <HowItWorks />
      <FeaturedEvents data={...data.results} />
    </>
  );
}
