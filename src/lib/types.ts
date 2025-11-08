export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "accent" | "link" | "inherit";
  size?: "base" | "sm" | "icon";
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
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
  setCustomPalette: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ButtonCopyProps {
  paletteType: "primary" | "secondary" | "custom";
  palette: string[];
}

export interface PaletteSectionProps {
  title: "Primary Colors" | "Secondary Colors" | "Custom Colors";
  palette: string[];
  handleSingleCopy: (c: string) => Promise<void>;
  paletteType: "primary" | "secondary" | "custom";
}
