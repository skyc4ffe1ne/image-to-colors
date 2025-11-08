import { useTheme } from "../contexts/ThemeProvider";
import { Sun, Moon } from "./icons.tsx";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="z-100 mt-4 inline-flex w-fit gap-1 rounded-full bg-gray-950/15 p-1 sm:absolute sm:top-(--spacing-nav) sm:right-10 sm:mt-0 dark:bg-white/10">
      <span
        aria-label="Light theme"
        title="Light theme"
        className="data-current:bg-background sun_footer fill-foreground cursor-pointer p-1.5 data-current:rounded-full data-current:ring data-current:ring-gray-950/20 data-current:inset-ring-white/10"
        data-current={theme === "light" ? true : undefined}
        onClick={() => setTheme("light")}
      >
        <Sun className="size-4" />
      </span>
      <span
        aria-label="Dark theme"
        title="Dark theme"
        className="moon_footer fill-foreground cursor-pointer p-1.5 data-current:rounded-full data-current:bg-stone-700 data-current:ring data-current:ring-stone-600 data-current:inset-ring-white"
        data-current={theme === "dark" ? true : undefined}
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-4" />
      </span>
    </div>
  );
}
