import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./carouselProvider.module.css";
import Hammer from "hammerjs";
import { userConfigAtom, userConfigDispatchAtom } from "./userConfigAtoms";
import { tabAtom } from "./tabAtoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

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

// TODO useState 記錄 carouselId 的 useState 改成 atom
// TODO 和 userConfig 的 index 整合 
// TODO 拿掉同步 currentItemIndex 的 useEffect
// TODO 等多出來 carouselAtom 再來改 CarouselProvider
const CarouselProvider = ({
  children,
  items,
  onSlideChange,
}: PropsWithChildren & CarouselProviderProps) => {
  const ref = useRef(null);
  const userConfig = useAtomValue(userConfigAtom);
  const userConfigDispatch = useSetAtom(userConfigDispatchAtom);
  const [{ id: tabId }] = useAtom(tabAtom);
  const [currentItemIndex, setCurrentItemIndex] = useState(
    userConfig[tabId]?.index ?? 0
  );
  const { top = 0, left = 0 } = items[currentItemIndex] ?? {};
  const maxLength = items.length;

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
      <div
        className={styles.container}
        ref={ref}
        style={{
          height:
            // TODO: 改成判斷 useragent
            window.innerWidth <= 768
              ? window.innerHeight || document.documentElement.clientHeight
              : "100vh",
        }}
      >
        {children}
      </div>
    </CarouselState.Provider>
  );
};

export default CarouselProvider;
