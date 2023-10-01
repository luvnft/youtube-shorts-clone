import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

export enum Id {
  "FOR_YOU" = "FOR_YOU",
  "FOLLOWING" = "FOLLOWING",
}

type TabState = {
  id: Id;
};

type TabAction = {
  type: "UPDATE_TAB";
  payload: {
    id: Id;
  };
};

const DEFAULT_STATE = {
  id: Id.FOLLOWING,
};

export const TabContext = createContext(DEFAULT_STATE);
export const TabDispatch = createContext<Dispatch<TabAction>>(() => {});

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case "UPDATE_TAB": {
      return { ...state, id: action.payload.id };
    }
    default: {
      return state;
    }
  }
};

const TabProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(tabReducer, DEFAULT_STATE);

  return (
    <TabContext.Provider value={state}>
      <TabDispatch.Provider value={dispatch}>{children}</TabDispatch.Provider>
    </TabContext.Provider>
  );
};

export default TabProvider;
