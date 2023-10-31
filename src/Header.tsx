import { HTMLAttributes } from "react";
import styles from "./header.module.css";
import {
  bars3Icon,
  ellipsisVerticalIcon,
  microphoneIcon,
  searchIcon,
  userCircleIcon,
} from "./Icon";

const Header = ({
  className,
  ...restProps
}: HTMLAttributes<HTMLHeadElement>) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <header {...restProps} className={[className, styles.header].join(" ")}>
      <div>
        <button type="button" className={styles.iconButton}>
          {bars3Icon}
        </button>
        <img src="/vite.svg" alt="log" />
      </div>
      {!isMobile && (
        <div>
          <div className={styles.searchTextBox}>
            <input type="text" name="search" placeholder="搜尋" />
            <button type="button" className={styles.iconButton}>
              {searchIcon}
            </button>
          </div>
          <button type="button" className={styles.iconButton}>
            {microphoneIcon}
          </button>
        </div>
      )}
      {!isMobile && (
        <div>
          <button type="button" className={styles.iconButton}>
            {ellipsisVerticalIcon}
          </button>
          <button type="button" className={styles.userButton}>
            {userCircleIcon}
            <span>登入</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
