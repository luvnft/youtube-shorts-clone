import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideoInformation from "./ShortVideoInformation";
import ShortVideo from "./ShortVideo";
import ShortVideoControl from "./ShortVideoControl";
import { TabContainer } from "./Tab";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowingList, fetchForYouList, mapToCarouselType } from "./api";
import { CSSProperties, PropsWithChildren } from "react";
import { ScopeProvider } from "jotai-scope";
import { shortVideoAtom, shortVideoDispatchAtom } from "./shortVideoAtoms";

const MainContent = ({
  className,
  style,
}: PropsWithChildren & {
  className: string;
  style: { [key: string]: string };
}) => {
  const { data: followingList = [] } = useQuery({
    queryKey: ["following"],
    queryFn: fetchFollowingList,
  });
  const { data: forYouList = [] } = useQuery({
    queryKey: ["forYou"],
    queryFn: fetchForYouList,
  });

  return (
    <main className={className} style={style as CSSProperties}>
      <div>
        <TabContainer>
          <ScopeProvider atoms={[shortVideoAtom, shortVideoDispatchAtom]}>
            <CarouselProvider items={followingList.map(mapToCarouselType)}>
              {followingList.map((item, i) => {
                const { play_url, cover, title } = item;
                return (
                  <CarouselItem key={i}>
                    <ShortVideo
                      index={i}
                      video={{ src: play_url }}
                      image={{ alt: title, src: cover }}
                    />
                    <ShortVideoInformation />
                    <ShortVideoControl />
                  </CarouselItem>
                );
              })}
            </CarouselProvider>
          </ScopeProvider>
          <ScopeProvider atoms={[shortVideoAtom, shortVideoDispatchAtom]}>
            <CarouselProvider items={forYouList.map(mapToCarouselType)}>
              {forYouList.map((item, i) => {
                const { play_url, cover, title } = item;
                return (
                  <CarouselItem key={i}>
                    <ShortVideo
                      index={i}
                      video={{ src: play_url }}
                      image={{ alt: title, src: cover }}
                    />
                    <ShortVideoInformation />
                    <ShortVideoControl />
                  </CarouselItem>
                );
              })}
            </CarouselProvider>
          </ScopeProvider>
        </TabContainer>
      </div>
    </main>
  );
};

export default MainContent;
