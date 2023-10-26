import { playIcon } from "./Icon";
import ProgressBar from "./ProgressBar";
import styles from "./shortVideoControl.module.css";
import { shortVideoAtom, shortVideoDispatchAtom } from "./shortVideoAtoms";
import { useAtomValue, useSetAtom } from "jotai";

const ShortVideoControl = () => {
  const { currentTime, duration, isPaused } = useAtomValue(shortVideoAtom);
  const dispatch = useSetAtom(shortVideoDispatchAtom);
  const percentage =
    currentTime === 0 || duration === 0 ? 0 : (currentTime / duration) * 100;

  const handleUpdatePercentage = (percentage: number) => {
    dispatch({
      type: "JUMP_TO",
      payload: { jumpToTime: (duration * percentage) / 100 },
    });
  };

  return (
    <>
      {isPaused && <div className={styles.playIcon}>{playIcon}</div>}
      <div className={styles.progressBar}>
        <ProgressBar
          percentage={percentage}
          onPercentageChange={handleUpdatePercentage}
        />
      </div>
    </>
  );
};

export default ShortVideoControl;
