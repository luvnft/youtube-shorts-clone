"use client";

import { PropsWithChildren } from "react";
import { Id } from "@/components/tab/tabAtoms";
import { PrimitiveAtom, Provider } from "jotai";
import { carouselTabIdAtom } from "./carouselAtoms";
import { useHydrateAtoms } from "jotai/react/utils";
import Carousel, { CarouselProps } from "./Carousel";

type CarouselContainerProps = CarouselProps & {
  name: Id;
};

const CarouselContainer = ({
  name,
  ...carouselProps
}: CarouselContainerProps) => {
  return (
    <Provider>
      <CarouselFetchDataHydrateAtom initialValues={[[carouselTabIdAtom, name]]}>
        <Carousel {...carouselProps} />
      </CarouselFetchDataHydrateAtom>
    </Provider>
  );
};

export default CarouselContainer;

function CarouselFetchDataHydrateAtom<T>({
  initialValues,
  children,
}: PropsWithChildren & { initialValues: Array<[PrimitiveAtom<T>, T]> }) {
  useHydrateAtoms(initialValues);
  return children;
}
