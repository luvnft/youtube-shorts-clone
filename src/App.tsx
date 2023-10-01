import "./App.css";
import Tab from "./Tab";
import TabProvider, { Id as TabId } from "./TabProvider";
import UserConfigProvider from "./UserConfigProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainContent from "./MainContent";

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
          <MainContent />
          <nav></nav>
        </TabProvider>
        <footer></footer>
      </UserConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
