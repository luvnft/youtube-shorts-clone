import { SidebarSectionProps } from "./SidebarSection";

export const getTopSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [
      { name: "首頁", id: "home", href: "/", icon: "/icons/home.svg" },
      {
        name: "Shorts",
        id: "shortVideo",
        href: "/shorts",
        icon: "/icons/video-camera.svg",
      },
      {
        name: "訂閱內容",
        id: "subscription",
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
        id: "userContent",
        href: "/",
        icon: "/icons/gift.svg",
      },
      {
        name: "觀看紀錄",
        id: "viewHistory",
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
        id: "mostViewVideos",
        href: "/",
        icon: "/icons/fire.svg",
      },
      {
        name: "音樂",
        id: "music",
        href: "/",
        icon: "/icons/musical-note.svg",
      },
      { name: "電影", id: "movie", href: "/", icon: "/icons/film.svg" },
      { name: "直播", id: "livestream", href: "/", icon: "/icons/signal.svg" },
      { name: "遊戲", id: "game", href: "/", icon: "/icons/squares-plus.svg" },
      { name: "新聞", id: "news", href: "/", icon: "/icons/news-paper.svg" },
      { name: "體育", id: "sports", href: "/", icon: "/icons/trophy.svg" },
      { name: "Podcast", id: "podcast", href: "/", icon: "/icons/radio.svg" },
    ],
  };
};

export const getBrowseSection = (): SidebarSectionProps => {
  return {
    title: "",
    links: [
      {
        name: "瀏覽頻道",
        id: "browseAllChannels",
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
        id: "youtubePremium",
        href: "/",
        icon: "/icons/rocket-launch.svg",
      },
      {
        name: "YouTube Music",
        id: "youtubeMusic",
        href: "/",
        icon: "/icons/gift.svg",
      },
      {
        name: "YouTube Kid",
        id: "youtubeKid",
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
        id: "setting",
        href: "/",
        icon: "/icons/cog-8-tooth.svg",
      },
      { name: "檢舉紀錄", id: "report", href: "/", icon: "/icons/flag.svg" },
      {
        name: "說明",
        id: "help",
        href: "/",
        icon: "/icons/question-mark-circle.svg",
      },
      {
        name: "提供意見",
        id: "feedback",
        href: "/",
        icon: "/icons/chat-bubble.svg",
      },
    ],
  };
};
