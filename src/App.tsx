import "./App.css";
import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideoInformation from "./ShortVideoInformation";
import ShortVideoProvider from "./ShortVideoProvider";
import ShortVideo from "./ShortVideo";
import ShortVideoControl from "./ShortVideoControl";

const srcset = [
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8",
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8",
];

function App() {
  return (
    <>
      <header>
        <img src="/vite.svg" alt="log" />
      </header>
      <nav></nav>
      <main>
        <ShortVideoProvider>
          <CarouselProvider>
            {srcset.map((src, i) => {
              return (
                <CarouselItem key={i}>
                  <ShortVideoInformation />
                  <ShortVideo src={src} />
                </CarouselItem>
              );
            })}
          </CarouselProvider>

          <ShortVideoControl />
        </ShortVideoProvider>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
