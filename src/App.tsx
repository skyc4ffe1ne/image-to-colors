import { useState } from "react";

import Canvas from "./components/Canvas";
import Palette from "./components/Palette";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";
import ToggleTheme from "./components/ToggleTheme.tsx";

function App() {
  const [palette, setPalette] = useState<string[]>([]);
  const [customPalette, setCustomPalette] = useState<string[]>([]);

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground flex min-h-screen w-full max-w-[1500px] flex-col px-2 [--spacing-nav:40px] sm:px-4 md:px-10 lg:[--spacing-nav:80px]">
        <ToggleTheme />

        <div className="mt-(--spacing-nav) flex flex-col gap-8 sm:gap-12 xl:flex-row xl:items-center xl:justify-between">
          <Canvas setPalette={setPalette} setCustomPalette={setCustomPalette} />
          {palette.length ? (
            <Palette palette={palette} customPalette={customPalette} />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
