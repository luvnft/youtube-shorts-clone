import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./carouselProvider.module.css";
import Hammer from "hammerjs";

type CarouselState = {
  currentItemIndex: number;
  items: CarouselItem[];
  itemClassName: string;
};

const DEFAULT_CONTEXT: CarouselState = {
  currentItemIndex: 0,
  items: [],
  itemClassName: "",
};

export const CarouselState = createContext<CarouselState>(DEFAULT_CONTEXT);

type CarouselItem = {
  id: string;
  top: number;
  left: number;
};

type CarouselProviderProps = {
  maxLength: number;
  items: CarouselItem[];
  onSlideChange?: (slideIndex: number) => void;
};

const CarouselProvider = ({
  children,
  items,
  maxLength,
  onSlideChange,
}: PropsWithChildren & CarouselProviderProps) => {
  const ref = useRef(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { top, left } = items[currentItemIndex];

  const handleSwipeUp = () => {
    setCurrentItemIndex((prev) => (prev + 1 >= maxLength ? prev : prev + 1));
  };

  const handleSwipeDown = () => {
    setCurrentItemIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
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

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentItemIndex);
    }
  }, [currentItemIndex, onSlideChange]);

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
    <CarouselState.Provider
      value={{
        currentItemIndex,
        itemClassName: styles.itemContainer,
        items,
      }}
    >
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    </CarouselState.Provider>
  );
};

export default CarouselProvider;
