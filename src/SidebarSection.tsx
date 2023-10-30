import { HTMLAttributes, PropsWithChildren } from "react";

const SidebarSection = ({
  children,
  title,
  className,
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
  return (
    <div className={className}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

export default SidebarSection;
