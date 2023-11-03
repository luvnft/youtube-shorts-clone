"use client";

import { HTMLProps, PropsWithChildren } from "react";
import { Id as TabId, tabAtom, tabDispatchAtom } from "./tabAtoms";
import styles from "./tab.module.css";
import { useAtomValue, useSetAtom } from "jotai";

const Tab = ({
  children,
  tabId,
}: HTMLProps<HTMLButtonElement> & { tabId: TabId }) => {
  const dispatch = useSetAtom(tabDispatchAtom);

  const handleClick = () => {
    dispatch({ type: "UPDATE_TAB", payload: { id: tabId } });
    // TODO: workaround & 隔離 logic
    document.querySelectorAll("video").forEach((video) => {
      if (!(video as HTMLVideoElement).paused) {
        (video as HTMLVideoElement).pause();
      }
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default Tab;

export const TabContainer = ({ children }: PropsWithChildren) => {
  const tab = useAtomValue(tabAtom);

  return (
    <div
      id={tab.id}
      className={styles.tabContainer}
      style={{
        transform: `translateX(${tab.id === TabId.FOLLOWING ? "0%" : "-50%"})`,
      }}
    >
      {children}
    </div>
  );
};
