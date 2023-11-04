import { SidebarSectionProps } from "./SidebarSection";

export const getTopSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [
      { name: "首頁", key: "home", href: "/", icon: "/icons/home.svg" },
      {
        name: "Shorts",
        key: "shortVideo",
        href: "/shorts",
        icon: "/icons/video-camera.svg",
      },
      {
        name: "訂閱內容",
        key: "subscription",
        href: "/",
        icon: "/icons/queue-list.svg",
      },
    ],
  };
};

export const getUserSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [
      {
        name: "你的內容",
        key: "userContent",
        href: "/",
        icon: "/icons/gift.svg",
      },
      {
        name: "觀看紀錄",
        key: "viewHistory",
        href: "/",
        icon: "/icons/clock.svg",
      },
    ],
  };
};

export const getSubscriptionSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [],
  };
};

export const getExploreSection = (): SidebarSectionProps => {
  return {
    title: "探索",
    links: [
      {
        name: "發燒影片",
        key: "mostViewVideos",
        href: "/",
        icon: "/icons/fire.svg",
      },
      {
        name: "音樂",
        key: "music",
        href: "/",
        icon: "/icons/musical-note.svg",
      },
      { name: "電影", key: "movie", href: "/", icon: "/icons/film.svg" },
      { name: "直播", key: "livestream", href: "/", icon: "/icons/signal.svg" },
      { name: "遊戲", key: "game", href: "/", icon: "/icons/squares-plus.svg" },
      { name: "新聞", key: "news", href: "/", icon: "/icons/news-paper.svg" },
      { name: "體育", key: "sports", href: "/", icon: "/icons/trophy.svg" },
      { name: "Podcast", key: "podcast", href: "/", icon: "/icons/radio.svg" },
    ],
  };
};

export const getBrowseSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [
      {
        name: "瀏覽頻道",
        key: "browseAllChannels",
        href: "/",
        icon: "/icons/plus-circle.svg",
      },
    ],
  };
};

export const getMoreSection = (): SidebarSectionProps => {
  return {
    title: "更多 YouTube 功能",
    links: [
      {
        name: "YouTube Premium",
        key: "youtubePremium",
        href: "/",
        icon: "/icons/rocket-launch.svg",
      },
      {
        name: "YouTube Music",
        key: "youtubeMusic",
        href: "/",
        icon: "/icons/gift.svg",
      },
      {
        name: "YouTube Kid",
        key: "youtubeKid",
        href: "/",
        icon: "/icons/heart.svg",
      },
    ],
  };
};

export const getSystemSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [
      {
        name: "設定",
        key: "setting",
        href: "/",
        icon: "/icons/cog-8-tooth.svg",
      },
      { name: "檢舉紀錄", key: "report", href: "/", icon: "/icons/flag.svg" },
      {
        name: "說明",
        key: "help",
        href: "/",
        icon: "/icons/question-mark-circle.svg",
      },
      {
        name: "提供意見",
        key: "feedback",
        href: "/",
        icon: "/icons/chat-bubble.svg",
      },
    ],
  };
};
