import { atom } from "jotai";

export enum Id {
  "FOR_YOU" = "FOR_YOU",
  "FOLLOWING" = "FOLLOWING",
}

type TabAction = {
  type: "UPDATE_TAB";
  payload: {
    id: Id;
  };
};

const DEFAULT_TAB_ID = Id.FOLLOWING;

export const tabIdAtom = atom(DEFAULT_TAB_ID);
export const tabAtom = atom((get) => ({ id: get(tabIdAtom) }));
export const tabDispatchAtom = atom(null, (_, set, action: TabAction) => {
  const { type, payload } = action;
  // reducer
  switch (type) {
    case "UPDATE_TAB": {
      set(tabIdAtom, payload.id);
      break;
    }
  }
});
