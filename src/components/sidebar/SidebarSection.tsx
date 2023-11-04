import { HTMLAttributes, PropsWithChildren } from "react";
import Link from "next/link";
import styles from "./sidebarSection.module.css";
import InlineSvg from "../inline-svg/inlineSvg";

export type SidebarSectionProps = {
  title?: string;
  links: SidebarLink[];
};

type SidebarLink = {
  icon: string; // path
  key: string;
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
                <Link href={link.href} className={styles.link}>
                  <InlineSvg src={link.icon}></InlineSvg>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SidebarSection;
