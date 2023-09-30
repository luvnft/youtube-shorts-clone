import { HTMLProps, useContext, useEffect, useRef } from "react";
import Hls from "hls.js";
import {
  ShortVideoContext,
  ShortVideoDispatchContext,
} from "./ShortVideoProvider";

// TODO: 判斷只有 html video element 的 props 才傳給他
const ShortVideo = (props: HTMLProps<HTMLVideoElement>) => {
  const ref = useRef<HTMLVideoElement>(null);
  const dispatch = useContext(ShortVideoDispatchContext);
  const { isPaused, jumpToTime, isDragging } = useContext(ShortVideoContext);
  const { src } = props;

  useEffect(() => {
    if (ref.current && src) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(ref.current);
      } else if (ref.current.canPlayType("application/vnd.apple.mpegurl")) {
        ref.current.src = src;
      }
    }
    // return () => {
    //   if (videoElement) {
    //     videoElement.pause();
    //     videoElement.removeAttribute('src');
    //     hls.detachMedia();
    //     hls.destroy();
    //   }
    // };
  }, [src, dispatch]);

  useEffect(() => {
    if (ref.current) {
      const video = ref.current as HTMLVideoElement;
      if (isPaused) {
        video.pause();
      } else {
        video.play();
      }
    }
  }, [isPaused]);

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
    if (!isDragging) {
      const video = ref.current as HTMLVideoElement;
      dispatch({
        type: "RECORD",
        payload: {
          currentTime: video.currentTime,
        },
      });
    }
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

  return (
    <video
      {...props}
      playsInline
      muted
      loop
      ref={ref}
      onTimeUpdate={handleTimeUpdate}
      onDurationChange={handleDurationChange}
    />
  );
};

export default ShortVideo;
