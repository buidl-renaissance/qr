import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    backgroundAlt: string;
    surface: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderSubtle: string;
    accent: string;
    accentHover: string;
    accentMuted: string;
    onAccent: string;
    shadow: string;
    grid: string;
    radius: string;
    fontDisplay: string;
    fontBody: string;
    fontMono: string;
  }
}

/** Utility studio: cool ink + teal, light surface, grid atmosphere */
export const theme: DefaultTheme = {
  background: "#E8EEF2",
  backgroundAlt: "#D5E0E8",
  surface: "#F7FAFC",
  text: "#0A1628",
  textSecondary: "#3A4A5C",
  textMuted: "#6B7C8F",
  border: "#B8C9D6",
  borderSubtle: "#CDD8E2",
  accent: "#0D7377",
  accentHover: "#095C5F",
  accentMuted: "rgba(13, 115, 119, 0.12)",
  onAccent: "#F7FAFC",
  shadow: "rgba(10, 22, 40, 0.12)",
  grid: "rgba(10, 22, 40, 0.06)",
  radius: "4px",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'IBM Plex Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
};
