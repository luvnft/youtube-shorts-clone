import { HTMLAttributes } from "react";
import SidebarSection from "./SidebarSection";
import { useAtomValue } from "jotai";
import {
  browseSectionAtom,
  exploreSectionAtom,
  moreSectionAtom,
  subscriptionSectionAtom,
  systemSectionAtom,
  topSectionAtom,
  userSectionAtom,
} from "./sidebarAtom";
import styles from "./sidebar.module.css";

const Sidebar = ({ className, ...restProps }: HTMLAttributes<HTMLElement>) => {
  const topSection = useAtomValue(topSectionAtom);
  const userSection = useAtomValue(userSectionAtom);
  const subscriptionSection = useAtomValue(subscriptionSectionAtom);
  const exploreSection = useAtomValue(exploreSectionAtom);
  const browseSection = useAtomValue(browseSectionAtom);
  const moreSection = useAtomValue(moreSectionAtom);
  const systemSection = useAtomValue(systemSectionAtom);
  const isAuth = false;

  return (
    <aside {...restProps} className={[className, styles.sidebar].join(" ")}>
      <SidebarSection {...topSection} />
      <SidebarSection {...userSection} />
      {isAuth ? (
        <SidebarSection {...subscriptionSection} />
      ) : (
        <SidebarSection links={[]}>
          <div className={styles.section}>
            登入帳戶即可對影片表示喜歡、發布留言及訂閱頻道。
          </div>
        </SidebarSection>
      )}
      <SidebarSection {...exploreSection} />
      <SidebarSection {...browseSection} />
      <SidebarSection {...moreSection} />
      <SidebarSection {...systemSection} />
      <SidebarSection links={[]}>
        <div className={[styles.section, styles.footer].join(" ")}>
          <ul>
            <li>
              <a href="/">簡介</a>
            </li>
            <li>
              <a href="/">媒體</a>
            </li>
            <li>
              <a href="/">版權</a>
            </li>
            <li>
              <a href="/">與我們聯絡</a>
            </li>
            <li>
              <a href="/">創作者</a>
            </li>
            <li>
              <a href="/">廣告</a>
            </li>
            <li>
              <a href="/">開發人員</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/">條款</a>
            </li>
            <li>
              <a href="/">隱私權</a>
            </li>
            <li>
              <a href="/">政策與安全性</a>
            </li>
            <li>
              <a href="/">YouTube運作方式</a>
            </li>
            <li>
              <a href="/">測試新功能</a>
            </li>
          </ul>
        </div>
      </SidebarSection>
      <span className={styles.copyright}>@2023 版權聲明</span>
    </aside>
  );
};

export default Sidebar;
