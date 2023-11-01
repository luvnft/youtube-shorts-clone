import { Id as TabId, tabIdAtom } from "@/components/tab/tabAtoms";
import { atom } from "jotai";

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
        index: number;
      };
    };

export const userConfigAtom = atom<UserConfig>({});
export const userConfigDispatchAtom = atom(
  null,
  (get, set, action: UserConfigAction) => {
    const tabId = get(tabIdAtom);
    const useConfigState = get(userConfigAtom);

    // reducer
    set(
      userConfigAtom,
      userConfigReducer<typeof tabId>(useConfigState, action, tabId)
    );
  }
);

export function userConfigReducer<T>(
  state: UserConfig,
  action: UserConfigAction,
  context: T
): UserConfig {
  // 因為不想 import tabId，因此將 context 轉成 string 但看起來難以閱讀
  // NIT: 應該改成 tabId？還是應該在arg 就限制tabid?
  const tabId = context as string;

  switch (action.type) {
    case "UPDATE_VIDEO_CACHE": {
      const { video } = action.payload;
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
      const { index } = action.payload;
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
}
