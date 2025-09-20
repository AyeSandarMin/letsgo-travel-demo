export interface SlideContent {
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
}

export const SLIDE_DURATION_MS = 10000;
export const VIDEO_PAUSE_DELAY_MS = 100;

export const NAVIGATION_ITEMS = ["Home", "About", "Explore", "Gallery", "Contact"] as const;

export const SLIDES_DATA: SlideContent[] = [
  {
    title: "Wonderful.",
    subtitle: "Island",
    description:
      "Discover pristine beaches and crystal-clear waters on exotic islands around the world. Experience the perfect blend of relaxation and adventure in paradise.",
    videoUrl: "/src/assets/videos/video001.mp4",
  },
  {
    title: "Camping.",
    subtitle: "Enjoy",
    description:
      "Reconnect with nature through unforgettable camping experiences. From mountain peaks to forest clearings, find your perfect outdoor escape.",
    videoUrl: "/src/assets/videos/video002.mp4",
  },
  {
    title: "Adventures.",
    subtitle: "Off Road",
    description:
      "Embark on thrilling off-road adventures that will get your heart racing. Explore rugged terrains and discover hidden gems off the beaten path.",
    videoUrl: "/src/assets/videos/video003.mp4",
  },
  {
    title: "Road Trip.",
    subtitle: "Together",
    description:
      "Create lasting memories with friends and family on epic road trips. Journey through scenic routes and discover amazing destinations together.",
    videoUrl: "/src/assets/videos/video004.mp4",
  },
  {
    title: "Feel Nature.",
    subtitle: "Relax",
    description:
      "Find your inner peace surrounded by nature's beauty. Experience tranquil moments that rejuvenate your mind, body, and soul.",
    videoUrl: "/src/assets/videos/video005.mp4",
  },
];