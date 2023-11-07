"use client";

import clsx from "clsx";
import { SidebarLinkProps } from "./SidebarSection";
import Link from "next/link";
import InlineSvg from "../inline-svg/inlineSvg";
import styles from "./sidebarLink.module.css";
import { usePathname } from "next/navigation";

const SidebarLink = ({ href, icon, name, id }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isLinkActive =
    href === "/" ? id === "home" && pathname === href : pathname === href;

  return (
    <li className={clsx(styles.listItem, isLinkActive && styles.active)}>
      <Link href={href} className={styles.link}>
        <InlineSvg src={icon}></InlineSvg>
        {name}
      </Link>
    </li>
  );
};

export default SidebarLink;
