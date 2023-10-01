import "./App.css";
import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideoInformation from "./ShortVideoInformation";
import ShortVideoProvider from "./ShortVideoProvider";
import ShortVideo from "./ShortVideo";
import ShortVideoControl from "./ShortVideoControl";
import { useState } from "react";
import Tab from "./Tab";
import TabProvider, { Id as TabId } from "./TabProvider";

const list = [
  {
    title: "video1",
    cover: "https://placehold.co/1440x2560/000/F00",
    play_url:
      "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8",
  },
  {
    title: "video2",
    cover: "https://placehold.co/1440x2560/000/FFF",
    play_url:
      "https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8",
  },
];
const list2 = [
  {
    title: "video3",
    cover: "https://placehold.co/1440x2560/F00/000",
    play_url:
      "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8",
  },
];

function App() {
  const [dataset, setDataset] = useState(list);
  const carouselItems = dataset.map((item, i) => {
    return {
      id: item.title,
      top: i * document.documentElement.clientHeight,
      left: 0,
    };
  });

  return (
    <>
      <ShortVideoProvider>
        <TabProvider>
          <header>
            <img src="/vite.svg" alt="log" />
            <Tab tabId={TabId.FOLLOWING} onClick={() => setDataset(list)}>
              following
            </Tab>
            <Tab tabId={TabId.FOR_YOU} onClick={() => setDataset(list2)}>
              for you
            </Tab>
          </header>
          <nav></nav>
          <main>
            <CarouselProvider items={carouselItems}>
              {dataset.map((item, i) => {
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
          </main>
        </TabProvider>
        <footer></footer>
      </ShortVideoProvider>
    </>
  );
}

export default App;
