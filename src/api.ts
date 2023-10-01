const FOLLOWING_URL = `${import.meta.env.VITE_APP_SERVER}/following_list`;
const FOR_YOU_URL = `${import.meta.env.VITE_APP_SERVER}/for_you_list`;

type Payload = {
  title: string;
  cover: string;
  play_url: string;
};

export const fetchFollowingList = (): Promise<Payload[]> =>
  fetch(FOLLOWING_URL)
    .then((response) => response.json())
    .then((data) => (data ? data.items : []));
export const fetchForYouList = (): Promise<Payload[]> =>
  fetch(FOR_YOU_URL)
    .then((response) => response.json())
    .then((data) => (data ? data.items : []));

// utils
export const mapToCarouselType = (item: Payload, i: number) => {
  return {
    id: item.title,
    top: i * document.documentElement.clientHeight,
    left: 0,
  };
};
