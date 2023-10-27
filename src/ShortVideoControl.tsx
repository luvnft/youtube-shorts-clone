import { playIcon } from "./Icon";
import ProgressBar from "./ProgressBar";
import styles from "./shortVideoControl.module.css";
import { shortVideoAtom, shortVideoProgressAtom } from "./shortVideoAtoms";
import { useAtom, useAtomValue } from "jotai";

const ShortVideoControl = () => {
  const { isPaused } = useAtomValue(shortVideoAtom);
  const [{ percentage }, dispatch] = useAtom(shortVideoProgressAtom);

  const handleUpdatePercentage = (percentage: number) => {
    dispatch({
      type: "JUMP_TO",
      payload: { percentage },
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
