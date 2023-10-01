import { PropsWithChildren, useContext } from "react";
import { CarouselState } from "./CarouselProvider";

const CarouselItem = ({ children }: PropsWithChildren) => {
  const { itemClassName } = useContext(CarouselState);

  return <div className={itemClassName}>{children}</div>;
};

export default CarouselItem;
