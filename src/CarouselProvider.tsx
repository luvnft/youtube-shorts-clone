import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./carouselProvider.module.css";
import Hammer from "hammerjs";

export const Carousel = createContext<string>("");

type CarouselItem<T> = {
  id: string;
  top: number;
  left: number;
  content: T;
};

// TODO: 上下切換影片 scroll to

const CarouselProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);
  const [debug, setDebug] = useState("");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  // const [items, setItems] = useState<CarouselItem<string>[]>([]);

  const handleSwipeUp = () => {
    setCurrentItemIndex((prev) => {
      // MODIFY TO ITEMS LENGTH
      if (prev + 1 >= 2) {
        return 2;
      } else {
        return prev + 1;
      }
    });
    setDebug(" up  gesture detected.");
  };

  const handleSwipeDown = () => {
    setCurrentItemIndex((prev) => {
      // MODIFY TO ITEMS LENGTH
      if (prev - 1 < 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });

    setDebug(" down  gesture detected. ");
  };

  useEffect(() => {
    const mc = new Hammer(ref.current ?? document.body);
    mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    mc.on("swipeup", handleSwipeUp);
    mc.on("swipedown", handleSwipeDown);

    return () => {
      mc.destroy();
    };
  }, []);

  // logic 要跟 carousel 脫鉤
  useEffect(() => {
    // 切換卡片要播放
    if (ref.current) {
      const container = ref.current as HTMLDivElement;
      const videos = container.querySelectorAll("video");
      // videos[currentItemIndex].muted = true;
      // videos[currentItemIndex].play();
    }
    // 清除上張的狀態
    // video.pause();
    //     video.removeAttribute('src');
    //     hls.detachMedia();
    //     hls.destroy();
  }, [currentItemIndex]);

  return (
    <Carousel.Provider value={styles.itemContainer}>
      <div
        style={{
          position: "fixed",
          background: "#fff",
          color: "#000",
          zIndex: 600,
          right: 0,
          top: 0,
        }}
      >
        {debug}
        currentIndex: {currentItemIndex}
      </div>
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    </Carousel.Provider>
  );
};

export default CarouselProvider;
