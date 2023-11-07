import { atom } from "jotai";

type Theme = {
  sidebar: {
    isCompact: boolean;
  };
};

export const themeAtom = atom<Theme>({
  sidebar: {
    isCompact: false,
  },
});
export const toggleSidebarSizeAtom = atom(null, (get, set) => {
  const themeConfig = get(themeAtom);
  set(themeAtom, {
    ...themeConfig,
    sidebar: {
      ...themeConfig.sidebar,
      isCompact: !themeConfig.sidebar.isCompact,
    },
  });
});
