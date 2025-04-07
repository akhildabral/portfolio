import { type ClassValue } from "clsx";

export type Theme = {
  name: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  fonts: {
    sans: string;
    mono: string;
  };
  spacing: {
    container: string;
    header: string;
    section: string;
  };
};

export const themes: { [key: string]: Theme } = {
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      background: "232 93% 2%",
      foreground: "180 100% 80%",
      card: "232 93% 4%",
      cardForeground: "180 100% 80%",
      popover: "232 93% 4%",
      popoverForeground: "180 100% 80%",
      primary: "180 100% 50%",
      primaryForeground: "232 93% 2%",
      secondary: "292 100% 50%",
      secondaryForeground: "232 93% 2%",
      muted: "232 93% 10%",
      mutedForeground: "180 100% 60%",
      accent: "322 100% 50%",
      accentForeground: "232 93% 2%",
      destructive: "0 100% 50%",
      destructiveForeground: "180 100% 80%",
      border: "180 100% 20%",
      input: "180 100% 20%",
      ring: "180 100% 50%"
    },
    fonts: {
      sans: "'JetBrains Mono', monospace",
      mono: "'Fira Code', monospace"
    },
    spacing: {
      container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      header: "py-6",
      section: "py-12"
    }
  },
  matrix: {
    name: "Matrix",
    colors: {
      background: "120 100% 2%",
      foreground: "120 100% 80%",
      card: "120 100% 4%",
      cardForeground: "120 100% 80%",
      popover: "120 100% 4%",
      popoverForeground: "120 100% 80%",
      primary: "120 100% 50%",
      primaryForeground: "120 100% 2%",
      secondary: "160 100% 50%",
      secondaryForeground: "120 100% 2%",
      muted: "120 100% 10%",
      mutedForeground: "120 100% 60%",
      accent: "140 100% 50%",
      accentForeground: "120 100% 2%",
      destructive: "0 100% 50%",
      destructiveForeground: "120 100% 80%",
      border: "120 100% 20%",
      input: "120 100% 20%",
      ring: "120 100% 50%"
    },
    fonts: {
      sans: "'Source Code Pro', monospace",
      mono: "'IBM Plex Mono', monospace"
    },
    spacing: {
      container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      header: "py-6",
      section: "py-12"
    }
  }
};