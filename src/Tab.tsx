import { HTMLProps, useContext } from "react";
import { TabDispatch, Id as TabId } from "./TabProvider";

const Tab = ({
  onClick,
  children,
  tabId,
}: HTMLProps<HTMLButtonElement> & { tabId: TabId; onClick: () => void }) => {
  const dispatch = useContext(TabDispatch);

  const handleClick = () => {
    dispatch({ type: "UPDATE_TAB", payload: { id: tabId } });
    onClick();
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default Tab;
