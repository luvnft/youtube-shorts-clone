import "./App.css";
import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideoInformation from "./ShortVideoInformation";
import ShortVideoProvider from "./ShortVideoProvider";
import ShortVideo from "./ShortVideo";
import ShortVideoControl from "./ShortVideoControl";

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

function App() {
  const carouselItems = list.map((item, i) => {
    return {
      id: item.title,
      top: i * document.documentElement.clientHeight,
      left: 0,
    };
  });
  return (
    <>
      <header>
        <img src="/vite.svg" alt="log" />
      </header>
      <nav></nav>
      <main>
        <CarouselProvider maxLength={list.length} items={carouselItems}>
          {list.map((item, i) => {
            const { play_url, cover, title } = item;
            return (
              <CarouselItem key={i}>
                <ShortVideoProvider>
                  <ShortVideoInformation />
                  <ShortVideo
                    index={i}
                    video={{ src: play_url }}
                    image={{ alt: title, src: cover }}
                  />
                  <ShortVideoControl />
                </ShortVideoProvider>
              </CarouselItem>
            );
          })}
        </CarouselProvider>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
