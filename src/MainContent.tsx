import CarouselContainer from "./CarouselContainer";
import { TabContainer } from "./Tab";
import { CSSProperties, PropsWithChildren } from "react";
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
          <CarouselContainer
            name={Id.FOLLOWING}
            focus={tabId === Id.FOLLOWING}
          />
          <CarouselContainer name={Id.FOR_YOU} focus={tabId === Id.FOR_YOU} />
        </TabContainer>
      </div>
    </main>
  );
};

export default MainContent;
