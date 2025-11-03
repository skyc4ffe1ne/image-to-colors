import { createContext, use, useEffect, useState } from "react";
import type { ThemeProviderProps, Theme } from "../lib/types.ts";

const ThemeContext = createContext<undefined | ThemeProviderProps>(undefined);

function getTheme(): Theme {
  let userTheme = localStorage.getItem("theme");
  if (userTheme !== null) {
    let userTheme_j = JSON.parse(userTheme);
    return userTheme_j;
  } else if (window.matchMedia("color-scheme:dark").matches) {
    return "dark";
  } else {
    return "light";
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme());

  useEffect(() => {
    const themeJSON = JSON.stringify(theme);
    localStorage.setItem("theme", themeJSON);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light",
    );
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = use(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme cannot be used outside of ThemeProvider");
  return context;
};
