import { VIDEO_PAUSE_DELAY_MS } from '../constants';

export const playVideo = async (video: HTMLVideoElement, index: number): Promise<void> => {
  console.log(`Playing video ${index}`);
  video.currentTime = 0;
  try {
    await video.play();
  } catch (error) {
    console.log(`Video ${index} play failed:`, error);
  }
};

export const pauseVideoWithDelay = (video: HTMLVideoElement): void => {
  setTimeout(() => {
    video.pause();
  }, VIDEO_PAUSE_DELAY_MS);
};