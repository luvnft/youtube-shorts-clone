import "./App.css";
import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideo from "./ShortVideo";

function App() {
  return (
    <>
      <header>
        <img src="/vite.svg" alt="log" />
      </header>
      <nav></nav>
      <main>
        <CarouselProvider>
          <CarouselItem>
            <img src="https://placehold.co/1440x2560/888/000" />
          </CarouselItem>
          <CarouselItem>
            <img src="https://placehold.co/1440x2560/888/f00" />
          </CarouselItem>
        </CarouselProvider>
        <ShortVideo />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
