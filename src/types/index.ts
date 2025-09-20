export interface SlideData {
  video: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface HeaderProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export interface SlideContentProps {
  slide: SlideData;
  isActive: boolean;
}

export interface SliderNavigationProps {
  slides: SlideData[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export interface SocialLink {
  icon: string;
  label: string;
  url: string;
}