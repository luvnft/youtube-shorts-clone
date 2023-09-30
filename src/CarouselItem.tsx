import { PropsWithChildren, useContext } from "react";
import { Carousel } from "./CarouselProvider";

const CarouselItem = ({ children }: PropsWithChildren) => {
  const context = useContext(Carousel);

  return <div className={context}>{children}</div>;
};

export default CarouselItem;
