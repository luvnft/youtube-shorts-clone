// 這個檔案會放自訂的 video 功能

export const customVideoTogglePlayAndPause = (
  videoElement: HTMLVideoElement
) => {
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
};

// const customVideoAttachEncoder = (videoElement: HTMLVideoElement) => {};

// const customVideoDetachEncoder = (videoElement: HTMLVideoElement) => {};

export const customVideoToggleMute = (videoElement: HTMLVideoElement) => {
  videoElement.muted = !videoElement.muted;
};

export const customVideoGotoTimestamp = (
  videoElement: HTMLVideoElement,
  progressPercentage: number
) => {
  videoElement.currentTime =
    ((progressPercentage < 0 ? 0 : progressPercentage) *
      videoElement.duration) /
    100;
};

export const customVideoGetSeePercentage = (videoElement: HTMLVideoElement) => {
  const { currentTime, duration } = videoElement;
  return currentTime === 0 || duration === 0
    ? 0
    : (currentTime / duration) * 100;
};
