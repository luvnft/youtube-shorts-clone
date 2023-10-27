import { atom } from "jotai";

type ShortVideoState = {
  currentTime: number;
  jumpToTime: number | null;
  duration: number;
  isPaused: boolean;
};

type ShortVideoAction =
  | {
      type: "PAUSE" | "PLAY" | "RESET_JUMP_TIME";
    }
  | {
      type: "TIME_UPDATE";
      payload: {
        currentTime: number;
      };
    }
  | {
      type: "INIT";
      payload: {
        currentTime: number;
        duration: number;
      };
    };

type ShortVideoProgressAction = {
  type: "JUMP_TO";
  payload: {
    percentage: number;
  };
};

const DEFAULT_STATE = {
  currentTime: 0,
  jumpToTime: null,
  duration: 0,
  isPaused: true,
};

export const shortVideoAtom = atom<ShortVideoState>(DEFAULT_STATE);
export const shortVideoDispatchAtom = atom(
  null,
  (get, set, action: ShortVideoAction) => {
    set(shortVideoAtom, shortVideoReducer(get(shortVideoAtom), action));
  }
);
export const shortVideoProgressAtom = atom(
  (get) => {
    const { currentTime, duration } = get(shortVideoAtom);
    const percentage =
      currentTime === 0 || duration === 0 ? 0 : (currentTime / duration) * 100;

    return {
      percentage,
    };
  },
  (get, set, action: ShortVideoProgressAction) => {
    set(shortVideoAtom, shortVideoProgressReducer(get(shortVideoAtom), action));
  }
);

const shortVideoReducer = (
  state: ShortVideoState,
  action: ShortVideoAction
): ShortVideoState => {
  switch (action.type) {
    case "TIME_UPDATE": {
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    }
    case "RESET_JUMP_TIME": {
      return {
        ...state,
        jumpToTime: null,
      };
    }
    case "PLAY": {
      return {
        ...state,
        isPaused: false,
      };
    }
    case "PAUSE": {
      return {
        ...state,
        isPaused: true,
      };
    }
    case "INIT": {
      return {
        ...state,
        currentTime: action.payload.currentTime,
        duration: action.payload.duration,
      };
    }
    default: {
      return state;
    }
  }
};

const shortVideoProgressReducer = (
  state: ShortVideoState,
  action: ShortVideoProgressAction
): ShortVideoState => {
  switch (action.type) {
    case "JUMP_TO": {
      const percentage =
        action.payload.percentage < 0 ? 0 : action.payload.percentage;
      return {
        ...state,
        jumpToTime: (state.duration * percentage) / 100,
      };
    }
    default: {
      return state;
    }
  }
};
