import styles from "./app.module.css";
import Tab from "./Tab";
import { Id as TabId } from "./tabAtoms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShortsContainer from "./ShortsContainer";
import { useMediaQuery } from "@uidotdev/usehooks";

const queryClient = new QueryClient();
const ASIDE_WIDTH = 280;

function App() {
  const isDesktopOrLaptop = useMediaQuery(
    "only screen and (min-width : 769px)"
  );
  const shortContainerWidth = isDesktopOrLaptop ? `480px` : "100%";
  const shortContainerTranslateX = isDesktopOrLaptop
    ? `${ASIDE_WIDTH / 2}px`
    : "0px";

  return (
    <QueryClientProvider client={queryClient}>
      <header className={styles.header}>
        <img src="/vite.svg" alt="log" />
        <Tab tabId={TabId.FOLLOWING}>following</Tab>
        <Tab tabId={TabId.FOR_YOU}>for you</Tab>
      </header>
      <main className={styles.main}>
        <ShortsContainer
          className={styles.shortContainer}
          style={{
            width: shortContainerWidth,
            transform: `translateX(${shortContainerTranslateX})`,
          }}
        />
        {isDesktopOrLaptop && (
          <aside className={styles.aside} style={{ width: `${ASIDE_WIDTH}px` }}>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </aside>
        )}
      </main>
      <nav></nav>
      <footer></footer>
    </QueryClientProvider>
  );
}

export default App;
