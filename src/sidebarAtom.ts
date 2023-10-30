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
} from "./Icon";
import { ReactElement } from "react";

type SidebarSection = {
  title?: string;
  links: SidebarLink[];
};

type SidebarLink = {
  icon: ReactElement;
  key: string;
  name: string;
  href: string;
};

const topSectionAtom = atom([
  { name: "首頁", key: "home", href: "/", icon: homeIcon },
  { name: "Shorts", key: "shortVideo", href: "/", icon: videoCameraIcon },
  { name: "訂閱內容", key: "subscription", href: "/", icon: queueListIcon },
]);
const userSectionAtom = atom([
  { name: "你的內容", key: "userContent", href: "/", icon: giftIcon },
  { name: "觀看紀錄", key: "viewHistory", href: "/", icon: clockIcon },
]);
const subscriptionSectionAtom = atom([]);
const exploreSectionAtom = atom([
  { name: "發燒影片", key: "mostViewVideos", href: "/", icon: fireIcon },
  { name: "音樂", key: "music", href: "/", icon: musicalNoteIcon },
  { name: "電影", key: "movie", href: "/", icon: filmIcon },
  { name: "直播", key: "livestream", href: "/", icon: signalIcon },
  { name: "遊戲", key: "game", href: "/", icon: squaresPlusIcon },
  { name: "新聞", key: "news", href: "/", icon: newsPaperIcon },
  { name: "體育", key: "sports", href: "/", icon: trophyIcon },
  { name: "Podcast", key: "podcast", href: "/", icon: radioIcon },
]);
const browseSectionAtom = atom([
  {
    name: "瀏覽頻道",
    key: "browseAllChannels",
    href: "/",
    icon: plusCircleIcon,
  },
]);

const moreSectionAtom = atom([
  {
    name: "YouTube Premium",
    key: "youtubePremium",
    href: "/",
    icon: rocketLaunchIcon,
  },
  { name: "YouTube Music", key: "youtubeMusic", href: "/", icon: giftIcon },
  { name: "YouTube Kid", key: "youtubeKid", href: "/", icon: heartIcon },
]);

const systemSectionAtom = atom([
  { name: "設定", key: "setting", href: "/", icon: cog8ToothIcon },
  { name: "檢舉紀錄", key: "report", href: "/", icon: flagIcon },
  { name: "說明", key: "help", href: "/", icon: questionMarkCircleIcon },
  { name: "提供意見", key: "feedback", href: "/", icon: chatBubbleIcon },
]);

export const sidebarLinkListAtom = atom((get): SidebarSection[] => {
  return [
    { title: "", links: get(topSectionAtom) },
    { title: "", links: get(userSectionAtom) },
    { title: "", links: get(subscriptionSectionAtom) },
    { title: "探索", links: get(exploreSectionAtom) },
    { title: "", links: get(browseSectionAtom) },
    { title: "更多 YouTube 功能", links: get(moreSectionAtom) },
    { title: "", links: get(systemSectionAtom) },
  ];
});
