import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import { Id as TabId } from "./tabAtoms";

type VideoCache = {
  index: number;
  currentTime: number;
  duration: number;
};

type UserConfig = {
  // tabId undefined mean no cache in this tab
  [key in keyof typeof TabId]?: VideoCache;
};

type UserConfigAction =
  | {
      type: "UPDATE_VIDEO_CACHE";
      payload: {
        tabId: TabId;
        video: {
          index: number;
          currentTime: number;
          duration: number;
        };
      };
    }
  | {
      type: "UPDATE_VIDEO_INDEX";
      payload: {
        tabId: TabId;
        index: number;
      };
    };

export const UserConfigContext = createContext<UserConfig>({});
export const UserConfigDispatch = createContext<Dispatch<UserConfigAction>>(
  () => {}
);

const userConfigReducer = (
  state: UserConfig,
  action: UserConfigAction
): UserConfig => {
  switch (action.type) {
    case "UPDATE_VIDEO_CACHE": {
      const { tabId, video } = action.payload;
      const { index, ...videoProps } = video;
      return {
        ...state,
        [tabId]: {
          index,
          ...videoProps,
        },
      };
    }
    case "UPDATE_VIDEO_INDEX": {
      const { tabId, index } = action.payload;
      return {
        ...state,
        [tabId]: {
          index,
          currentTime: 0,
          duration: 0,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const UserConfigProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userConfigReducer, {});

  return (
    <UserConfigContext.Provider value={state}>
      <UserConfigDispatch.Provider value={dispatch}>
        {children}
      </UserConfigDispatch.Provider>
    </UserConfigContext.Provider>
  );
};

export default UserConfigProvider;
