import { atom } from "jotai";

type VideoCache = {
  index: number;
  currentTime: number;
  duration: number;
};

type UserConfig = {
  video?: VideoCache;
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
    const useConfigState = get(userConfigAtom);

    // reducer
    set(userConfigAtom, userConfigReducer(useConfigState, action));
  }
);

export function userConfigReducer(
  state: UserConfig,
  action: UserConfigAction
): UserConfig {
  switch (action.type) {
    case "UPDATE_VIDEO_CACHE": {
      const { video } = action.payload;
      const { index, ...videoProps } = video;
      return {
        ...state,
        video: {
          index,
          ...videoProps,
        },
      };
    }
    case "UPDATE_VIDEO_INDEX": {
      const { index } = action.payload;
      return {
        ...state,
        video: {
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
