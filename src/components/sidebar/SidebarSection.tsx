import { HTMLAttributes, PropsWithChildren } from "react";
import { SidebarSection as SidebarSectionProps } from "./sidebarAtom";
import styles from "./sidebarSection.module.css";

const SidebarSection = ({
  title,
  className,
  links = [],
  children,
}: PropsWithChildren<HTMLAttributes<HTMLElement> & SidebarSectionProps>) => {
  return (
    <div className={[className, styles.section].join(" ")}>
      {children || (
        <>
          {title && <h3>{title}</h3>}
          <ul>
            {links.map((link, j) => (
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
        </>
      )}
    </div>
  );
};

export default SidebarSection;
