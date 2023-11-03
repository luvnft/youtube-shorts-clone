"use client";

import { useEffect, useRef } from "react";
import styles from "./carousel.module.css";
import Hammer from "hammerjs";
import { useAtom } from "jotai";
import CarouselItem from "./CarouselItem";
import ShortVideo from "./ShortVideo";
import { carouselIdAtom } from "./carouselAtoms";

type Payload = {
  title: string;
  cover: string;
  play_url: string;
};

type CarouselItem = Payload & {
  id: string;
  top: number;
  left: number;
};

export type CarouselProps = {
  focus: boolean;
  data: Payload[];
};

const mapToCarouselType = (item: Payload, i: number): CarouselItem => {
  return {
    ...item,
    id: item.title,
    top: i * document.documentElement.clientHeight,
    left: 0,
  };
};

// TODO 手勢看可不可以拉出去用 atom 管理
const Carousel = ({ focus, data }: CarouselProps) => {
  const ref = useRef(null);
  const [currentItemIndex, dispatchCarouselIndex] = useAtom(carouselIdAtom);
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

export default Carousel;
