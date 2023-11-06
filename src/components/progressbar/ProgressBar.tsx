import styles from "./progressbar.module.css";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { useEffect } from "react";

// TODO:  isDragging 時只改變 progressbar，!isDragging 觸發 onChange event
const ProgressBar = ({
  percentage,
  onPercentageChange,
}: {
  percentage: number;
  onPercentageChange: (percentage: number) => void;
}) => {
  const [{ width, left }, api] = useSpring(() => ({
    width: percentage ?? 0,
    left: percentage ?? 0,
  }));
  const bindDrag = useDrag(
    ({ xy: [touchX], currentTarget, down }) => {
      const containerRect = (
        currentTarget as HTMLDivElement
      ).getBoundingClientRect();
      const progress =
        ((touchX - containerRect.left) / containerRect.width) * 100;

      if (progress <= 100 && progress >= 0) {
        onPercentageChange(progress);
        api.start({ width: progress, left: progress, immediate: down });
      }
    },
    { axis: "x" }
  );

  useEffect(() => {
    api.start({ width: percentage, left: percentage });
  }, [percentage, api]);

  return (
    <animated.div {...bindDrag()} className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <animated.div
          className={styles.progressInnerBar}
          style={{ width: width.to((v) => `${v}%`) }}
        ></animated.div>
      </div>
      <animated.div
        className={styles.progressBarPoint}
        style={{ left: left.to((v) => `${v}%`) }}
      ></animated.div>
    </animated.div>
  );
};

export default ProgressBar;
