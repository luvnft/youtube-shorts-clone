import { HTMLAttributes } from "react";
import SidebarSection from "./SidebarSection";
import { useAtomValue } from "jotai";
import { sidebarLinkListAtom } from "./sidebarAtom";
import styles from "./sidebar.module.css";

const Sidebar = ({ className, ...restProps }: HTMLAttributes<HTMLElement>) => {
  const linkSections = useAtomValue(sidebarLinkListAtom);

  return (
    <aside {...restProps} className={[className, styles.sidebar].join(" ")}>
      {linkSections.map((section, i) => (
        <SidebarSection
          title={section.title}
          key={i}
          className={styles.section}
        >
          <ul>
            {section.links.map((link, j) => (
              <li
                key={j}
                className={[
                  styles.listItem,
                  link.key === "shortVideo" && styles.active,
                ].join(" ")}
              >
                <a href={link.href} className={styles.link}>
                  {link.icon}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </SidebarSection>
      ))}
    </aside>
  );
};

export default Sidebar;
