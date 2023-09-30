import styles from "./iconButton.module.css";
import { PropsWithChildren, ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
};

const IconButton = ({
  icon,
  children,
}: PropsWithChildren & IconButtonProps) => {
  return (
    <label className={styles.container}>
      <button type="button" className={styles.icon}>
        {icon}
      </button>
      <div className={styles.iconTitle}>{children}</div>
    </label>
  );
};

export default IconButton;
