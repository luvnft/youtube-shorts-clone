import CarouselItem from "./CarouselItem";
import CarouselProvider from "./CarouselProvider";
import ShortVideoInformation from "./ShortVideoInformation";
import ShortVideoProvider from "./ShortVideoProvider";
import ShortVideo from "./ShortVideo";
import ShortVideoControl from "./ShortVideoControl";
import { TabContainer } from "./Tab";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowingList, fetchForYouList, mapToCarouselType } from "./api";
import { CSSProperties, PropsWithChildren } from "react";

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
          <CarouselProvider items={followingList.map(mapToCarouselType)}>
            {followingList.map((item, i) => {
              const { play_url, cover, title } = item;
              return (
                <CarouselItem key={i}>
                  <ShortVideoProvider>
                    <ShortVideo
                      index={i}
                      video={{ src: play_url }}
                      image={{ alt: title, src: cover }}
                    />
                    <ShortVideoInformation />
                    <ShortVideoControl />
                  </ShortVideoProvider>
                </CarouselItem>
              );
            })}
          </CarouselProvider>
          <CarouselProvider items={forYouList.map(mapToCarouselType)}>
            {forYouList.map((item, i) => {
              const { play_url, cover, title } = item;
              return (
                <CarouselItem key={i}>
                  <ShortVideoProvider>
                    <ShortVideo
                      index={i}
                      video={{ src: play_url }}
                      image={{ alt: title, src: cover }}
                    />
                    <ShortVideoInformation />
                    <ShortVideoControl />
                  </ShortVideoProvider>
                </CarouselItem>
              );
            })}
          </CarouselProvider>
        </TabContainer>
      </div>
    </main>
  );
};

export default MainContent;
