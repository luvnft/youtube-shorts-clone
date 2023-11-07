"use client";

import clsx from "clsx";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import styles from "./sidebarResponsiveContainer.module.css";
import { useAtom } from "jotai";
import { themeAtom } from "themeAtoms";

const SideBarResponsiveContainer = ({
  children,
  className,
  ...restProps
}: PropsWithChildren & HtmlHTMLAttributes<HTMLElement>) => {
  const [{ sidebar }] = useAtom(themeAtom);

  return (
    <aside
      {...restProps}
      className={clsx(
        className,
        styles.sidebar,
        sidebar.isCompact && styles.compact
      )}
    >
      {children}
      <span className={styles.copyright}>@2023 版權聲明</span>
    </aside>
  );
};

export default SideBarResponsiveContainer;
