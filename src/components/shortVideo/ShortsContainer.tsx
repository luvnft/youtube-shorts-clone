"use client";
// TODO: 資料改從 server actions 取得

import CarouselContainer from "./CarouselContainer";
import { TabContainer } from "@/components/tab/Tab";
import { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";
import { Id, tabIdAtom } from "@/components/tab/tabAtoms";
import { useAtomValue } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ShortsContainer = ({
  className,
  style,
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
  const tabId = useAtomValue(tabIdAtom);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default ShortsContainer;
