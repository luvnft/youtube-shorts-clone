import "./App.css";
import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideoInformation from "./ShortVideoInformation";
import ShortVideoProvider from "./ShortVideoProvider";
import ShortVideo from "./ShortVideo";
import ShortVideoControl from "./ShortVideoControl";
import Tab, { TabContainer } from "./Tab";
import TabProvider, { Id as TabId } from "./TabProvider";
import UserConfigProvider from "./UserConfigProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchFollowingList, fetchForYouList, mapToCarouselType } from "./api";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserConfigProvider>
        <TabProvider>
          <header>
            <img src="/vite.svg" alt="log" />
            <Tab tabId={TabId.FOLLOWING}>following</Tab>
            <Tab tabId={TabId.FOR_YOU}>for you</Tab>
          </header>
          <Main />
          <nav></nav>
        </TabProvider>
        <footer></footer>
      </UserConfigProvider>
    </QueryClientProvider>
  );
}

export default App;

const Main = () => {
  const { data: followingList = [] } = useQuery({
    queryKey: ["following"],
    queryFn: fetchFollowingList,
  });
  const { data: forYouList = [] } = useQuery({
    queryKey: ["forYou"],
    queryFn: fetchForYouList,
  });

  return (
    <main>
      <TabContainer>
        <CarouselProvider items={followingList.map(mapToCarouselType)}>
          {followingList.map((item, i) => {
            const { play_url, cover, title } = item;
            return (
              <CarouselItem key={i}>
                <ShortVideoProvider>
                  <ShortVideoControl />
                  <ShortVideo
                    index={i}
                    video={{ src: play_url }}
                    image={{ alt: title, src: cover }}
                  />
                  <ShortVideoInformation />
                </ShortVideoProvider>
              </CarouselItem>
            );
          })}
        </CarouselProvider>
        <CarouselProvider items={forYouList.map(mapToCarouselType)}>
          {forYouList.map((item, i) => {
            const { play_url, cover, title } = item;
            return (
              <CarouselItem key={i}>
                <ShortVideoProvider>
                  <ShortVideoControl />
                  <ShortVideo
                    index={i}
                    video={{ src: play_url }}
                    image={{ alt: title, src: cover }}
                  />
                  <ShortVideoInformation />
                </ShortVideoProvider>
              </CarouselItem>
            );
          })}
        </CarouselProvider>
      </TabContainer>
    </main>
  );
};
