import CarouselContainer from "./CarouselContainer";
import { TabContainer } from "./Tab";
import { CSSProperties, PropsWithChildren } from "react";
import { ScopeProvider } from "jotai-scope";
import { shortVideoAtom, shortVideoDispatchAtom } from "./shortVideoAtoms";
import { Id, tabIdAtom } from "./tabAtoms";
import { useAtomValue } from "jotai";

const MainContent = ({
  className,
  style,
}: PropsWithChildren & {
  className: string;
  style: { [key: string]: string };
}) => {
  const tabId = useAtomValue(tabIdAtom);

  return (
    <main className={className} style={style as CSSProperties}>
      <div>
        <TabContainer>
          <ScopeProvider atoms={[shortVideoAtom, shortVideoDispatchAtom]}>
            <CarouselContainer
              name={Id.FOLLOWING}
              focus={tabId === Id.FOLLOWING}
            />
          </ScopeProvider>
          <ScopeProvider atoms={[shortVideoAtom, shortVideoDispatchAtom]}>
            <CarouselContainer name={Id.FOR_YOU} focus={tabId === Id.FOR_YOU} />
          </ScopeProvider>
        </TabContainer>
      </div>
    </main>
  );
};

export default MainContent;
