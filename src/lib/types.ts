export interface ButtonProps {
  children: React.ReactNode;
  type: "primary" | "secondary" | "accent" | "link" | "inherit";
  size?: "base" | "sm" | "icon";
  className?: string;
}

export interface PaletteProps {
  palette: string[];
  customPalette: string[];
}

export type Theme = "light" | "dark";
export interface ThemeProviderProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export interface CanvasProps {
  setPalette: (p: string[]) => void;
  setCustomPalette: (cp: string[]) => void;
}
