import { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./sidebarSection.module.css";
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
};

const SidebarSection = ({
  title,
  className,
  links = [],
  children,
}: PropsWithChildren<HTMLAttributes<HTMLElement> & SidebarSectionProps>) => {
  return (
    <div className={clsx(className, styles.section)}>
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
