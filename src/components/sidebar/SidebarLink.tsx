"use client";

import clsx from "clsx";
import { SidebarLinkProps } from "./SidebarSection";
import Link from "next/link";
import InlineSvg from "../inline-svg/inlineSvg";
import styles from "./sidebarResponsiveContainer.module.css";
import { usePathname } from "next/navigation";

const SidebarLink = ({
  href,
  icon,
  name,
  id,
  showInCompactMode,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isLinkActive =
    href === "/" ? id === "home" && pathname === href : pathname === href;

  return (
    <li
      className={clsx(
        styles.listItem,
        isLinkActive && styles.active,
        showInCompactMode && styles.smallListItem
      )}
    >
      <Link href={href} className={styles.link}>
        <InlineSvg src={icon}></InlineSvg>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
