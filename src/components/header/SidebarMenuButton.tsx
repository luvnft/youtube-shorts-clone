"use client";

import { useSetAtom } from "jotai";
import InlineSvg from "../inline-svg/inlineSvg";
import headerStyles from "./header.module.css";
import { toggleSidebarSizeAtom } from "themeAtoms";
import clsx from "clsx";

const SidebarMenuButton = () => {
  const toggleSidebarSize = useSetAtom(toggleSidebarSizeAtom);

  const handleClick = () => {
    toggleSidebarSize();
  };

  return (
    <button
      type="button"
      className={clsx(headerStyles.iconButton, headerStyles.sidebarMenuButton)}
      onClick={handleClick}
    >
      <InlineSvg src="/icons/bars-3.svg" />
    </button>
  );
};

export default SidebarMenuButton;
