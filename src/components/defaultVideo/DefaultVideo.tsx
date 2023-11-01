import {
  VideoHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  customVideoGetSeePercentage,
  customVideoGotoTimestamp,
  customVideoToggleMute,
  customVideoTogglePlayAndPause,
} from "./defaultVideo.utils";

export type DefaultVideoMethod = HTMLVideoElement & {
  attachEncoder: () => void;
  detachEncoder: () => void;
  togglePlayAndPause: () => void;
  toggleMute: () => void;
  gotoTimestamp: (progressPercentage: number) => void;
  getSeekPercentage: () => number;
};

// TODO: bind 所有 video 相關功能
// NIT: 呼叫看可不可以改傳入 props 或 context 的方式，不要用 ref 操作
const DefaultVideo = forwardRef(
  (props: VideoHTMLAttributes<HTMLVideoElement>, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useImperativeHandle(
      ref,
      () => {
        const video = videoRef.current as HTMLVideoElement;
        // TODO: 改用正向表列列 props，不要完全把 video ref 完全傳出去，也是避免外部直接更改
        // 加上 video 本身的 method
        return Object.assign(video, {
          // attachEncoder: () => customVideoAttachEncoder(video),
          // detachEncoder: () => customVideoDetachEncoder(video),
          togglePlayAndPause: () => customVideoTogglePlayAndPause(video),
          toggleMute: () => customVideoToggleMute(video),
          gotoTimestamp: (progressPercentage: number) =>
            customVideoGotoTimestamp(video, progressPercentage),
          getSeekPercentage: () => customVideoGetSeePercentage(video),
        });
      },
      []
    );

    return <video ref={videoRef} {...props} />;
  }
);

export default DefaultVideo;
