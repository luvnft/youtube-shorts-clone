import { PropsWithChildren, createContext } from "react";
import styles from "./carouselProvider.module.css";

export const Carousel = createContext<string>("");

const CarouselProvider = ({ children }: PropsWithChildren) => {
  return (
    <Carousel.Provider value={styles.itemContainer}>
      <div className={styles.container}>
        {children}
      </div>
    </Carousel.Provider>
  );
};

export default CarouselProvider;
