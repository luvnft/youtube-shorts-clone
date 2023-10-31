import styles from "./iconButton.module.css";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type IconButtonProps = HTMLAttributes<HTMLLabelElement> & {
  icon: ReactNode;
  theme?: "dark" | "light";
};

const IconButton = ({
  icon,
  children,
  className,
  theme = "light",
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <label
      className={[
        styles.container,
        theme === "dark" && styles.dark,
        className,
      ].join(" ")}
    >
      <button type="button" className={styles.icon}>
        {icon}
      </button>
      <div className={styles.iconTitle}>{children}</div>
    </label>
  );
};

export default IconButton;
