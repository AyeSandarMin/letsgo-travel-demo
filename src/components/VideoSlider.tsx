import React, { useState, useEffect, useRef, JSX } from "react";
import { Facebook, Instagram, Twitter, Menu, X } from "lucide-react";
import { SLIDE_DURATION_MS, NAVIGATION_ITEMS, SLIDES_DATA } from '../constants';
import { playVideo, pauseVideoWithDelay } from '../utils/videoHelpers';

const renderHeader = (isMobileMenuOpen: boolean, toggleMobileMenu: () => void): JSX.Element => (
  <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-4 lg:px-48 lg:py-6 transition-all duration-500">
    <a
      href="#"
      className="text-white text-2xl font-bold uppercase tracking-wider hover:text-blue-200 transition-colors"
    >
      Let's Go
    </a>

    <nav className="hidden lg:flex">
      <div className="flex space-x-8">
        {NAVIGATION_ITEMS.map((item) => (
          <a
            key={item}
            href="#"
            className="relative text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"></span>
          </a>
        ))}
      </div>
    </nav>

    <button
      onClick={toggleMobileMenu}
      className="lg:hidden text-white z-50 relative"
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
    </button>

    {isMobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="rounded-lg p-8 m-4 max-w-md w-full">
          <nav className="flex flex-col space-y-6">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-800 text-xl font-medium text-center hover:text-blue-600 transition-colors"
                onClick={() => toggleMobileMenu()}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    )}
  </header>
);

const renderVideoBackground = (activeSlideIndex: number, videoRefs: React.RefObject<(HTMLVideoElement | null)[]>): JSX.Element => (
  <div className="video-wrapper absolute inset-0 z-0">
    {SLIDES_DATA.map((slide, index) => (
      <video
        key={index}
        ref={(el) => {
          videoRefs.current[index] = el;
        }}
        className={`video-slide absolute inset-0 w-full h-full object-cover ${
          index === activeSlideIndex ? "active" : ""
        }`}
        src={slide.videoUrl}
        autoPlay={index === activeSlideIndex}
        muted
        loop
        playsInline
        preload="auto"
      />
    ))}
  </div>
);

const renderSlideContent = (activeSlideIndex: number): JSX.Element => (
  <div className="relative z-30 min-h-screen flex flex-col justify-center px-4 lg:px-48">
    <div className="max-w-4xl">
      {SLIDES_DATA.map((slide, index) => (
        <div
          key={index}
          className={`${
            index === activeSlideIndex
              ? "block opacity-100 translate-x-0"
              : "hidden"
          }`}
        >
          <h1 className="text-white text-4xl lg:text-7xl font-black uppercase tracking-wider mb-8 leading-tight">
            {slide.title}
            <span className="block text-3xl lg:text-5xl font-semibold text-blue-200">
              {slide.subtitle}
            </span>
          </h1>
          <p className="text-white text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed opacity-90">
            {slide.description}
          </p>
          <a
            href="#"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-blue-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Explore Now
          </a>
        </div>
      ))}
    </div>
  </div>
);

const renderSocialLinks = (): JSX.Element => (
  <div className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-6">
    <a
      href="#"
      className="text-white hover:text-blue-200 hover:scale-125 transition-all duration-300"
    >
      <Facebook size={28} />
    </a>
    <a
      href="#"
      className="text-white hover:text-blue-200 hover:scale-125 transition-all duration-300"
    >
      <Instagram size={28} />
    </a>
    <a
      href="#"
      className="text-white hover:text-blue-200 hover:scale-125 transition-all duration-300"
    >
      <Twitter size={28} />
    </a>
  </div>
);

const renderSlideIndicators = (activeSlideIndex: number, handleSlideChange: (index: number) => void): JSX.Element => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4">
    {SLIDES_DATA.map((_, index) => (
      <button
        key={index}
        onClick={() => handleSlideChange(index)}
        className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 hover:scale-125 ${
          index === activeSlideIndex
            ? "bg-white"
            : "bg-transparent hover:bg-white hover:bg-opacity-50"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

const renderProgressBar = (activeSlideIndex: number): JSX.Element => (
  <div className="absolute bottom-0 left-0 w-full h-1 bg-opacity-20 z-30">
    <div
      className="h-full transition-all duration-300"
      style={{ width: `${((activeSlideIndex + 1) / SLIDES_DATA.length) * 100}%` }}
    ></div>
  </div>
);

const VideoSlider: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((previousIndex) => (previousIndex + 1) % SLIDES_DATA.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeSlideIndex) {
        playVideo(video, index);
      } else {
        pauseVideoWithDelay(video);
      }
    });
  }, [activeSlideIndex]);

  const handleSlideChange = (index: number): void => {
    setActiveSlideIndex(index);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative min-h-screen bg-[#2696e6] overflow-hidden h-screen">
      {renderHeader(isMobileMenuOpen, toggleMobileMenu)}
      {renderVideoBackground(activeSlideIndex, videoRefs)}
      {renderSlideContent(activeSlideIndex)}
      {renderSocialLinks()}
      {renderSlideIndicators(activeSlideIndex, handleSlideChange)}
      {renderProgressBar(activeSlideIndex)}
    </div>
  );
};

export default VideoSlider;
