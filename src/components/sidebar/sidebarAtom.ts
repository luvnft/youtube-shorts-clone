import { atom } from "jotai";
import {
  chatBubbleIcon,
  clockIcon,
  cog8ToothIcon,
  filmIcon,
  fireIcon,
  flagIcon,
  giftIcon,
  heartIcon,
  homeIcon,
  musicalNoteIcon,
  newsPaperIcon,
  plusCircleIcon,
  questionMarkCircleIcon,
  queueListIcon,
  radioIcon,
  rocketLaunchIcon,
  signalIcon,
  squaresPlusIcon,
  trophyIcon,
  videoCameraIcon,
} from "../icon/Icon";
import { ReactElement } from "react";

export type SidebarSection = {
  title?: string;
  links: SidebarLink[];
};

type SidebarLink = {
  icon: ReactElement;
  key: string;
  name: string;
  href: string;
};

export const topSectionAtom = atom<SidebarSection>({
  title: "",
  links: [
    { name: "首頁", key: "home", href: "/", icon: homeIcon },
    { name: "Shorts", key: "shortVideo", href: "/", icon: videoCameraIcon },
    { name: "訂閱內容", key: "subscription", href: "/", icon: queueListIcon },
  ],
});
export const userSectionAtom = atom<SidebarSection>({
  title: "",
  links: [
    { name: "你的內容", key: "userContent", href: "/", icon: giftIcon },
    { name: "觀看紀錄", key: "viewHistory", href: "/", icon: clockIcon },
  ],
});
export const subscriptionSectionAtom = atom<SidebarSection>({
  title: "",
  links: [],
});
export const exploreSectionAtom = atom<SidebarSection>({
  title: "探索",
  links: [
    { name: "發燒影片", key: "mostViewVideos", href: "/", icon: fireIcon },
    { name: "音樂", key: "music", href: "/", icon: musicalNoteIcon },
    { name: "電影", key: "movie", href: "/", icon: filmIcon },
    { name: "直播", key: "livestream", href: "/", icon: signalIcon },
    { name: "遊戲", key: "game", href: "/", icon: squaresPlusIcon },
    { name: "新聞", key: "news", href: "/", icon: newsPaperIcon },
    { name: "體育", key: "sports", href: "/", icon: trophyIcon },
    { name: "Podcast", key: "podcast", href: "/", icon: radioIcon },
  ],
});
export const browseSectionAtom = atom<SidebarSection>({
  title: "",
  links: [
    {
      name: "瀏覽頻道",
      key: "browseAllChannels",
      href: "/",
      icon: plusCircleIcon,
    },
  ],
});

export const moreSectionAtom = atom<SidebarSection>({
  title: "更多 YouTube 功能",
  links: [
    {
      name: "YouTube Premium",
      key: "youtubePremium",
      href: "/",
      icon: rocketLaunchIcon,
    },
    { name: "YouTube Music", key: "youtubeMusic", href: "/", icon: giftIcon },
    { name: "YouTube Kid", key: "youtubeKid", href: "/", icon: heartIcon },
  ],
});

export const systemSectionAtom = atom<SidebarSection>({
  title: "",
  links: [
    { name: "設定", key: "setting", href: "/", icon: cog8ToothIcon },
    { name: "檢舉紀錄", key: "report", href: "/", icon: flagIcon },
    { name: "說明", key: "help", href: "/", icon: questionMarkCircleIcon },
    { name: "提供意見", key: "feedback", href: "/", icon: chatBubbleIcon },
  ],
});
