import CarouselContainer from "./CarouselContainer";
import { TabContainer } from "../tab/Tab";
import { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";
import { Id, tabIdAtom } from "../tab/tabAtoms";
import { useAtomValue } from "jotai";

const ShortsContainer = ({
  className,
  style,
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
  const tabId = useAtomValue(tabIdAtom);

  return (
    <div className={className} style={style as CSSProperties}>
      <div style={{ height: "100%" }}>
        <TabContainer>
          <CarouselContainer
            name={Id.FOLLOWING}
            focus={tabId === Id.FOLLOWING}
          />
          <CarouselContainer name={Id.FOR_YOU} focus={tabId === Id.FOR_YOU} />
        </TabContainer>
      </div>
    </div>
  );
};

export default ShortsContainer;
