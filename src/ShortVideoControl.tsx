import { useContext } from "react";
import { playIcon } from "./Icon";
import ProgressBar from "./ProgressBar";
import styles from "./shortVideoControl.module.css";
import {
  ShortVideoContext,
  ShortVideoDispatchContext,
} from "./ShortVideoProvider";

const ShortVideoControl = () => {
  const { currentTime, duration, isPaused } = useContext(ShortVideoContext);
  const dispatch = useContext(ShortVideoDispatchContext);
  const percentage =
    currentTime === 0 || duration === 0 ? 0 : (currentTime / duration) * 100;

  const toggleVideo = () => {
    if (isPaused) {
      dispatch({ type: "PLAY" });
    } else {
      dispatch({ type: "PAUSE" });
    }
  };

  const handleUpdatePercentage = (percentage: number) => {
    dispatch({
      type: "JUMP_TO",
      payload: { jumpToTime: (duration * percentage) / 100 },
    });
  };

  return (
    <div className={styles.controlPanel} onClick={toggleVideo}>
      {isPaused && <div className={styles.playIcon}>{playIcon}</div>}
      <div className={styles.progressBar}>
        <ProgressBar
          percentage={percentage}
          onPercentageChange={handleUpdatePercentage}
        />
      </div>
    </div>
  );
};

export default ShortVideoControl;
