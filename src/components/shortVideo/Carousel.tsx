"use client";

import styles from "./carousel.module.css";
import { useAtom } from "jotai";
import CarouselItem from "./CarouselItem";
import ShortVideo from "./ShortVideo";
import { carouselIdAtom } from "./carouselAtoms";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";

type Payload = {
  title: string;
  cover: string;
  play_url: string;
};

export type CarouselProps = {
  data: Payload[];
};

const Carousel = ({ data }: CarouselProps) => {
  const [currentItemIndex, dispatchCarouselIndex] = useAtom(carouselIdAtom);
  const isMobile = window.innerWidth <= 768;
  const items = data ?? [];
  const maxLength = items.length;
  const [{ height, y }, api] = useSpring(() => ({
    height: isMobile
      ? window.innerHeight || document.documentElement.clientHeight
      : "100%",
    y: 0,
    marginTop: 0,
  }));
  const bindDrag = useDrag(({ swipe: [, swipeY] }) => {
    if (swipeY < 0) {
      // swipe next
      // animation
      if (currentItemIndex + 1 < maxLength) {
        api.start({
          y: (currentItemIndex + 1) * 100 * -1,
        });
      }
      // state
      dispatchCarouselIndex({ type: "GO_NEXT", payload: { maxLength } });
    } else if (swipeY > 0) {
      // swipe previous
      // animation
      if (currentItemIndex - 1 >= 0) {
        api.start({
          y: (currentItemIndex - 1) * 100 * -1,
        });
      }
      // state
      dispatchCarouselIndex({ type: "GO_PREVIOUS" });
    } else {
      // TODO: drag
      // if 超過 threshold
      // 移動 y 軸距離 * 移動方向
      // else move
    }
  });

  return (
    <animated.div
      {...bindDrag()}
      className={styles.container}
      style={{
        height,
        y: y.to((v) => `${v}%`),
        marginTop: isMobile ? 0 : `${Math.max(0, currentItemIndex * 3)}%`, // 3 is .itemContainer + .itemContainer margin
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
    </animated.div>
  );
};

export default Carousel;
