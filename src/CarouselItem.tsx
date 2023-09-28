import { useContext } from "react";
import { Carousel } from "./CarouselProvider";

const CarouselItem = ({ color }: { color: string }) => {
  const context = useContext(Carousel);

  return (
    <div className={context}>
      <img src={`https://placehold.co/1440x2560/000/${color}`} alt="item" />
    </div>
  );
};

export default CarouselItem;
