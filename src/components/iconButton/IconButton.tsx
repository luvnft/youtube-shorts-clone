import InlineSvg from "../inline-svg/inlineSvg";
import styles from "./iconButton.module.css";
import { HTMLAttributes, PropsWithChildren } from "react";

type IconButtonProps = HTMLAttributes<HTMLLabelElement> & {
  icon: string;
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
        <InlineSvg src={icon} />
      </button>
      <div className={styles.iconTitle}>{children}</div>
    </label>
  );
};

export default IconButton;
