import { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./carouselContainer.module.css";
import Hammer from "hammerjs";
import { Id } from "../tab/tabAtoms";
import { PrimitiveAtom, Provider, atom, useAtom, useAtomValue } from "jotai";
import CarouselItem from "./CarouselItem";
import ShortVideo from "./ShortVideo";
import { carouselIdAtom } from "./carouselAtoms";
import { fetchFollowingList, fetchForYouList, mapToCarouselType } from "../../api";
import { useHydrateAtoms } from "jotai/react/utils";
import { useQuery } from "@tanstack/react-query";

type CarouselContainerProps = {
  name: Id;
  focus: boolean;
};

const carouselTabIdAtom = atom(Id.FOLLOWING);

const CarouselContainer = ({ name, focus }: CarouselContainerProps) => {
  return (
    <Provider>
      <CarouselFetchDataHydrateAtom initialValues={[[carouselTabIdAtom, name]]}>
        <Carousel focus={focus} />
      </CarouselFetchDataHydrateAtom>
    </Provider>
  );
};

const tabQueryFn = {
  [Id.FOLLOWING]: fetchFollowingList,
  [Id.FOR_YOU]: fetchForYouList,
};

// TODO 手勢看可不可以拉出去用 atom 管理
const Carousel = ({ focus }: { focus: boolean }) => {
  const ref = useRef(null);
  const carouselTabId = useAtomValue(carouselTabIdAtom);
  const [currentItemIndex, dispatchCarouselIndex] = useAtom(carouselIdAtom);
  const { data } = useQuery({
    queryKey: [carouselTabId.toString()],
    queryFn: tabQueryFn[carouselTabId],
  });
  const items = data?.map(mapToCarouselType) ?? [];
  const { top = 0, left = 0 } = items[currentItemIndex] ?? {};
  const maxLength = items.length;
  const isMobile = window.innerWidth <= 768;

  // bind 手勢操作
  useEffect(() => {
    const handleSwipeUp = () => {
      dispatchCarouselIndex({ type: "GO_NEXT", payload: { maxLength } });
    };

    const handleSwipeDown = () => {
      dispatchCarouselIndex({ type: "GO_PREVIOUS" });
    };
    const mc = new Hammer(ref.current ?? document.body);
    if (focus) {
      mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
      mc.on("swipeup", handleSwipeUp);
      mc.on("swipedown", handleSwipeDown);
    } else {
      mc.destroy();
    }
  }, [focus, maxLength, dispatchCarouselIndex]);

  // bind scroll
  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLElement).scrollTo({
        top,
        left,
        behavior: "smooth",
      });
    }
  }, [top, left]);

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{
        height: isMobile
          ? window.innerHeight || document.documentElement.clientHeight
          : "100%",
      }}
    >
      {items.map((item, i) => {
        const { play_url, cover, title } = item;
        return (
          <CarouselItem key={i} className={styles.itemContainer}>
            <ShortVideo
              index={i}
              video={{ src: play_url, poster: cover, alt: title }}
            />
          </CarouselItem>
        );
      })}
    </div>
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
