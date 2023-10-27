import { PropsWithChildren } from "react";

const CarouselItem = ({
  children,
  className,
}: PropsWithChildren & { className: string }) => {
  return <div className={className}>{children}</div>;
};

export default CarouselItem;
