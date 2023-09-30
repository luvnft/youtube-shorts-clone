import { useEffect, useRef, useState } from "react";
import styles from "./progressbar.module.css";

const ProgressBar = ({
  percentage,
  onPercentageChange,
}: {
  percentage: number;
  onPercentageChange: (percentage: number) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(percentage);
  const ref = useRef(null);

  useEffect(() => {
    const mc = new Hammer(ref.current || document.body);

    mc.get("pan").set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 0,
    });
    mc.get("press").set({
      time: 20,
      threshold: 2,
    });

    mc.on("press", (e) => {
      if (!ref.current) {
        return;
      }
      e.preventDefault();
      const container = ref.current as HTMLDivElement;
      const containerRect = container.getBoundingClientRect();
      const touchX = e.center.x - containerRect.left;
      const progress = (touchX / containerRect.width) * 100;
      setIsDragging(true);
      setCurrentProgress(progress);
    });

    mc.on("panmove", (e) => {
      if (!ref.current) {
        return;
      }
      if (isDragging) {
        const container = ref.current as HTMLDivElement;
        const containerRect = container.getBoundingClientRect();
        const touchX = e.center.x - containerRect.left;
        const progress = (touchX / containerRect.width) * 100;

        if (progress >= 0 && progress <= 100) {
          setCurrentProgress(progress);
        }
      }
    });

    return () => {
      mc.destroy();
    };
  }, [isDragging, currentProgress, onPercentageChange]);

  const onRelease = () => {
    setIsDragging(false);
    onPercentageChange(currentProgress);
  };

  return (
    <div
      className={styles["progress-container"]}
      ref={ref}
      onMouseUp={onRelease}
      onTouchEnd={onRelease}
    >
      <div className={styles["progress-bar"]}>
        <div
          className={styles["progress-inner-bar"]}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div
        className={styles["progress-bar-point"]}
        style={{ left: `${isDragging ? currentProgress : percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
