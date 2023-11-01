import styles from "./app.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShortsContainer from "@/components/shortVideo/ShortsContainer";
import { useMediaQuery } from "@uidotdev/usehooks";
import Sidebar from "@/components/sidebar/Sidebar";

const queryClient = new QueryClient();
const ASIDE_WIDTH = 280;

function App() {
  const isDesktopOrLaptop = useMediaQuery(
    "only screen and (min-width : 769px)"
  );

  return (
    <QueryClientProvider client={queryClient}>
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
