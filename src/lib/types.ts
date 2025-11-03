export interface ButtonProps {
  children: React.ReactNode;
  type: "primary" | "secondary" | "accent" | "link" | "inherit";
  size?: "base" | "sm" | "icon";
  className?: string;
}

export interface Palette {
  color: string;
  repeat: number;
}

export interface PaletteProps {
  palette: Palette[];
}

export type Theme = "light" | "dark";
export interface ThemeProviderProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
}
