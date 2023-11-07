import { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./sidebarResponsiveContainer.module.css";
import clsx from "clsx";
import SidebarLink from "./SidebarLink";

export type SidebarSectionProps = {
  title?: string;
  links: SidebarLinkProps[];
};

export type SidebarLinkProps = {
  icon: string; // path
  id: string;
  name: string;
  href: string;
  showInCompactMode: boolean;
};

const SidebarSection = ({
  title,
  className,
  links = [],
  children,
}: PropsWithChildren<HTMLAttributes<HTMLElement> & SidebarSectionProps>) => {
  const isShowSection = links.some((link) => link.showInCompactMode);

  return (
    <div
      className={clsx(
        className,
        styles.section,
        isShowSection && styles.smallSection
      )}
    >
      {children || (
        <>
          {title && <h3>{title}</h3>}
          <ul>
            {links.map((link, j) => (
              <SidebarLink key={j} {...link} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SidebarSection;
