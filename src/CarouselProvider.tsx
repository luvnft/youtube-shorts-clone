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

const CarouselProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);
  const [debug, setDebug] = useState("");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleSwipeUp = () => {
    // current index + 1
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
    // current index - 1
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
