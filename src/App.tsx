import styles from "./app.module.css";
import Tab from "./Tab";
import { Id as TabId } from "./tabAtoms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShortsContainer from "./ShortsContainer";
import { useMediaQuery } from "@uidotdev/usehooks";
import Sidebar from "./Sidebar";

const queryClient = new QueryClient();
const ASIDE_WIDTH = 280;

function App() {
  const isDesktopOrLaptop = useMediaQuery(
    "only screen and (min-width : 769px)"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <header className={styles.header}>
        <img src="/vite.svg" alt="log" />
        <Tab tabId={TabId.FOLLOWING}>following</Tab>
        <Tab tabId={TabId.FOR_YOU}>for you</Tab>
      </header>
      <main className={styles.main}>
        {isDesktopOrLaptop && (
          <Sidebar
            className={styles.aside}
            style={{ width: `${ASIDE_WIDTH}px` }}
          />
        )}
        <ShortsContainer className={styles.shortContainer} />
      </main>
      <nav></nav>
      <footer></footer>
    </QueryClientProvider>
  );
}

export default App;
