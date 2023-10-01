import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./carouselProvider.module.css";
import Hammer from "hammerjs";
import { UserConfigContext, UserConfigDispatch } from "./UserConfigProvider";
import { TabContext } from "./TabProvider";

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
  items: CarouselItem[];
  onSlideChange?: (slideIndex: number) => void;
};

const CarouselProvider = ({
  children,
  items,
  onSlideChange,
}: PropsWithChildren & CarouselProviderProps) => {
  const ref = useRef(null);
  const userConfig = useContext(UserConfigContext);
  const userConfigDispatch = useContext(UserConfigDispatch);
  const { id: tabId } = useContext(TabContext);
  const [currentItemIndex, setCurrentItemIndex] = useState(
    userConfig[tabId]?.index ?? 0
  );
  const { top = 0, left = 0 } = items[currentItemIndex] ?? {};
  const maxLength = items.length;
  console.log(maxLength);

  useEffect(() => {
    const handleSwipeUp = () => {
      setCurrentItemIndex((prev) => (prev + 1 >= maxLength ? prev : prev + 1));
    };

    const handleSwipeDown = () => {
      setCurrentItemIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    };
    const mc = new Hammer(ref.current ?? document.body);
    mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    mc.on("swipeup", handleSwipeUp);
    mc.on("swipedown", handleSwipeDown);

    return () => {
      mc.destroy();
    };
  }, [tabId, maxLength]);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentItemIndex);
    }
    userConfigDispatch({
      type: "UPDATE_VIDEO_INDEX",
      payload: {
        tabId,
        index: currentItemIndex,
      },
    });
  }, [currentItemIndex, onSlideChange, tabId, userConfigDispatch]);

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
