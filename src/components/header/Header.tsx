import { HTMLAttributes } from "react";
import styles from "./header.module.css";
import logo from "@/assets/logo.svg";
import InlineSvg from "../inline-svg/inlineSvg";
import SidebarMenuButton from "./SidebarMenuButton";
import clsx from "clsx";

const Header = ({
  className,
  ...restProps
}: HTMLAttributes<HTMLHeadElement>) => {
  return (
    <header {...restProps} className={clsx(className, styles.header)}>
      <div>
        <SidebarMenuButton />
        <img src={logo.src} alt="logo" />
      </div>

      <div>
        <div className={styles.searchTextBox}>
          <input type="text" name="search" placeholder="搜尋" />
          <button type="button" className={styles.iconButton}>
            <InlineSvg src="/icons/search.svg" />
          </button>
        </div>
        <button type="button" className={styles.iconButton}>
          <InlineSvg src="/icons/microphone.svg" />
        </button>
      </div>

      <div>
        <button type="button" className={styles.iconButton}>
          <InlineSvg src="/icons/ellipsis-vertical.svg" />
        </button>
        <button type="button" className={styles.userButton}>
          <InlineSvg src="/icons/user-circle.svg" />
          <span>登入</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
