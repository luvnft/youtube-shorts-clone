import "./App.css";
import CarouselProvider from "./CarouselProvider";

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
            <Short.Provider>
              <div>
                <div>
                  <button type="button">like</button>
                  <button type="button">comment</button>
                </div>
                <div>
                  <div>short name</div>
                  <div>user name</div>
                </div>
              </div>
              <div>
                <ProgressBar />
              </div>
            </Short.Provider>
          </CarouselItem>
        </CarouselProvider>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
