import { atom } from "jotai";
import { userConfigAtom, userConfigDispatchAtom } from "../../userConfigAtoms";
import { tabIdAtom } from "@/components/tab/tabAtoms";

type CarouselAction =
  | {
      type: "GO_PREVIOUS";
    }
  | {
      type: "GO_NEXT";
      payload: {
        maxLength: number;
      };
    };

// derived read and write atom. depend on user config
export const carouselIdAtom = atom(
  (get) => {
    const userConfig = get(userConfigAtom);
    const tabId = get(tabIdAtom);
    return userConfig[tabId]?.index ?? 0;
  },
  (get, set, action: CarouselAction) => {
    const newId = carouselReducer(get(carouselIdAtom), action);
    set(userConfigDispatchAtom, {
      type: "UPDATE_VIDEO_INDEX",
      payload: {
        index: newId,
      },
    });
  }
);

const carouselReducer = (state: number, action: CarouselAction): number => {
  switch (action.type) {
    case "GO_NEXT": {
      return state + 1 >= action.payload.maxLength ? state : state + 1;
    }
    case "GO_PREVIOUS": {
      return state - 1 < 0 ? 0 : state - 1;
    }
    default: {
      return state;
    }
  }
};
