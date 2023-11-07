import { HTMLAttributes } from "react";
import Link from "next/link";
import SidebarSection from "./SidebarSection";
import {
  getTopSection,
  getUserSection,
  getSubscriptionSection,
  getExploreSection,
  getBrowseSection,
  getMoreSection,
  getSystemSection,
} from "./sidebar.utils";
import styles from "./sidebar.module.css";
import clsx from "clsx";
import SideBarResponsiveContainer from "./SideBarResponsiveContainer";

const Sidebar = ({ className, ...restProps }: HTMLAttributes<HTMLElement>) => {
  const topSection = getTopSection();
  const userSection = getUserSection();
  const subscriptionSection = getSubscriptionSection();
  const exploreSection = getExploreSection();
  const browseSection = getBrowseSection();
  const moreSection = getMoreSection();
  const systemSection = getSystemSection();
  const isAuth = false;

  return (
    <SideBarResponsiveContainer className={className} {...restProps}>
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
        <div className={clsx(styles.section, styles.footer)}>
          <ul>
            <li>
              <Link href="/">簡介</Link>
            </li>
            <li>
              <Link href="/">媒體</Link>
            </li>
            <li>
              <Link href="/">版權</Link>
            </li>
            <li>
              <Link href="/">與我們聯絡</Link>
            </li>
            <li>
              <Link href="/">創作者</Link>
            </li>
            <li>
              <Link href="/">廣告</Link>
            </li>
            <li>
              <Link href="/">開發人員</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/">條款</Link>
            </li>
            <li>
              <Link href="/">隱私權</Link>
            </li>
            <li>
              <Link href="/">政策與安全性</Link>
            </li>
            <li>
              <Link href="/">YouTube運作方式</Link>
            </li>
            <li>
              <Link href="/">測試新功能</Link>
            </li>
          </ul>
        </div>
      </SidebarSection>
    </SideBarResponsiveContainer>
  );
};

export default Sidebar;
