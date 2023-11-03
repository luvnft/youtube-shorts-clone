import {
  HTMLProps,
  MouseEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import styles from "./shortVideo.module.css";
import { useAtomValue } from "jotai";
import { carouselIdAtom } from "./carouselAtoms";
import Video, { DefaultVideoMethod } from "../defaultVideo/DefaultVideo";
import ShortVideoInformation from "./ShortVideoInformation";
import { playIcon } from "../icon/Icon";
import ProgressBar from "../progressbar/ProgressBar";

type ShortVideoProps = {
  index: number;
  video: HTMLProps<HTMLVideoElement>;
};

const ShortVideo = memo(({ index, video: videoProps }: ShortVideoProps) => {
  const ref = useRef<DefaultVideoMethod>(null);
  const currentItemIndex = useAtomValue(carouselIdAtom);
  const [percentage, setPercentage] = useState(0);
  const { src: videoSrc } = videoProps;
  const isShowMuteButton = ref.current?.muted ?? true;
  const isShowPlayIcon = ref.current?.paused ?? true;

  // TODO: refactor here. 要把 ref 視為 Video 而不是 HTMLVideoElement i.e. 要想清楚哪些要 public
  // bind hls
  useEffect(() => {
    let hls: Hls | null = null;
    const video = ref.current as HTMLVideoElement;
    if (currentItemIndex === index) {
      if (video && videoSrc) {
        if (Hls.isSupported()) {
          hls = new Hls({
            maxMaxBufferLength: 600,
            maxBufferLength: 60,
          });
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
        }
      }
    }
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      // if (hls) {
      //   hls.detachMedia();
      //   hls.destroy();
      // }
    };
  }, [currentItemIndex, index, videoSrc]);

  const toggleMuteButton = () => {
    ref.current?.toggleMute();
  };

  // drag progress bar to update the video progress
  const handleUpdatePercentage = (percentage: number) => {
    ref.current?.gotoTimestamp(percentage);
  };

  const togglePlayAndPause = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      ref.current?.togglePlayAndPause();
    }
  };

  return (
    <div className={styles.videoContainer}>
      <Video
        {...videoProps}
        className={styles.video}
        playsInline
        loop
        muted
        autoPlay
        ref={ref}
        onTimeUpdate={() => {
          const time = ref.current?.getSeekPercentage();
          if (time) {
            setPercentage(time);
          }
        }}
      />
      <div
        className={styles.videoOverlay}
        aria-label="video-overlay"
        onClick={togglePlayAndPause}
      >
        {isShowMuteButton && (
          <button
            type="button"
            className={styles.muteButton}
            onClick={toggleMuteButton}
          >
            取消靜音
          </button>
        )}
        <ShortVideoInformation />
        {isShowPlayIcon && (
          <div
            className={styles.playIcon}
            onClick={() => ref.current?.togglePlayAndPause()}
          >
            {playIcon}
          </div>
        )}
        <div className={styles.progressBar} data-progressbar="true">
          <ProgressBar
            percentage={percentage}
            onPercentageChange={handleUpdatePercentage}
          />
        </div>
      </div>
    </div>
  );
});

export default ShortVideo;
