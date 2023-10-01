import {
  HTMLProps,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import {
  ShortVideoContext,
  ShortVideoDispatchContext,
} from "./ShortVideoProvider";
import { CarouselState } from "./CarouselProvider";
import styles from "./shortVideo.module.css";

type ShortVideoProps = {
  index: number;
  video: HTMLProps<HTMLVideoElement>;
  image: HTMLProps<HTMLImageElement>;
};

const ShortVideo = memo(
  ({ index, video: videoProps, image: imgProps }: ShortVideoProps) => {
    const [isShowThumbnail, setIsShowThumbnail] = useState(true);
    const ref = useRef<HTMLVideoElement>(null);
    const dispatch = useContext(ShortVideoDispatchContext);
    const { jumpToTime } = useContext(ShortVideoContext);
    const { currentItemIndex } = useContext(CarouselState);
    const { src: videoSrc } = videoProps;
    const isShowMuteButton = ref.current?.muted ?? true;

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
          dispatch({ type: "PAUSE" });
          video.pause();
          video.currentTime = 0;
        }
        // if (hls) {
        //   hls.detachMedia();
        //   hls.destroy();
        // }
      };
    }, [currentItemIndex, index, dispatch, videoSrc]);

    // drag progress bar to update the video progress
    useEffect(() => {
      if (jumpToTime !== null) {
        if (ref.current) {
          const video = ref.current as HTMLVideoElement;
          video.currentTime = jumpToTime;
          dispatch({ type: "RESET_JUMP_TIME" });
        }
      }
    }, [jumpToTime, dispatch]);

    const handleTimeUpdate = () => {
      const video = ref.current as HTMLVideoElement;
      dispatch({
        type: "TIME_UPDATE",
        payload: {
          currentTime: video.currentTime,
        },
      });
    };

    const handleDurationChange = () => {
      const video = ref.current as HTMLVideoElement;
      dispatch({
        type: "INIT",
        payload: {
          currentTime: video.currentTime,
          duration: video.duration,
        },
      });
    };

    const toggleVideo = () => {
      const video = ref.current as HTMLVideoElement;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };

    const handlePlaying = () => {
      setIsShowThumbnail(false);
      dispatch({ type: "PLAY" });
    };

    const handlePause = () => {
      if (currentItemIndex !== index) {
        setIsShowThumbnail(true);
      }
      dispatch({ type: "PAUSE" });
    };

    const toggleMuteButton = () => {
      const video = ref.current as HTMLVideoElement;
      video.muted = !video.muted;
    };

    return (
      <>
        {isShowMuteButton && (
          <button
            type="button"
            className={styles.muteButton}
            onClick={toggleMuteButton}
          >
            取消靜音
          </button>
        )}
        <img
          {...imgProps}
          className={styles.thumbnail}
          style={{ opacity: isShowThumbnail ? 1 : 0 }}
        />
        <video
          {...videoProps}
          playsInline
          loop
          muted
          autoPlay
          ref={ref}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onClick={toggleVideo}
          onPlaying={handlePlaying}
          onPause={handlePause}
        />
      </>
    );
  }
);

export default ShortVideo;
