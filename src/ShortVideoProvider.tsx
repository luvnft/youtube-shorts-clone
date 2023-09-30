import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

type ShortVideoState = {
  currentTime: number;
  jumpToTime: number | null;
  duration: number;
  isPaused: boolean;
  isDragging: boolean;
};

type ShortVideoAction =
  | {
      type: "PAUSE" | "PLAY" | "RESET_JUMP_TIME";
    }
  | {
      type: "JUMP_TO";
      payload: {
        jumpToTime: number;
      };
    }
  | {
      type: "RECORD";
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
    }
  | {
      type: "UPDATE_DRAGGING";
      payload: {
        isDragging: boolean;
      };
    };

const DEFAULT_STATE = {
  currentTime: 0,
  jumpToTime: null,
  duration: 0,
  isPaused: true,
  isDragging: false,
};

export const ShortVideoContext = createContext<ShortVideoState>(DEFAULT_STATE);
export const ShortVideoDispatchContext = createContext<
  Dispatch<ShortVideoAction>
>(() => {});

const shortVideoReducer = (
  state: ShortVideoState,
  action: ShortVideoAction
): ShortVideoState => {
  switch (action.type) {
    case "RECORD": {
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    }
    case "JUMP_TO": {
      return {
        ...state,
        jumpToTime: action.payload.jumpToTime,
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
    case "UPDATE_DRAGGING": {
      return { ...state, isDragging: action.payload.isDragging };
    }
    default: {
      return state;
    }
  }
};

const ShortVideoProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(shortVideoReducer, DEFAULT_STATE);
  return (
    <ShortVideoContext.Provider value={state}>
      <ShortVideoDispatchContext.Provider value={dispatch}>
        {children}
      </ShortVideoDispatchContext.Provider>
    </ShortVideoContext.Provider>
  );
};

export default ShortVideoProvider;
