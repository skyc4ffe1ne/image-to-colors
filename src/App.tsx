import { useState, useRef } from "react";
import { convertColors } from "./utils/convertColors.ts";

import Canvas from "./components/Canvas";
import Palette from "./components/Palette";
import Toolbar from "./components/Toolbar";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";
import ToggleTheme from "./components/ToggleTheme.tsx";

function App() {
  const [palette, setPalette] = useState([]);
  const [customPalette, setCustomPalette] = useState([]);
  const [typePalette, setTypePalette] = useState(undefined);
  const toolbarRef = useRef(null);

  function handleSetTypePalette(e) {
    let numberPalette = e.target.dataset.tab;
    let refactorPalette =
      numberPalette === "0"
        ? palette.map((el) => el[0])
        : convertColors(palette);
    setTypePalette((tp) => (tp = refactorPalette));
  }

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground flex min-h-screen w-full flex-col gap-12 px-2 [--spacing-nav:40px] sm:px-4 md:px-10 lg:[--spacing-nav:80px]">
        <ToggleTheme />

        <div className="mt-(--spacing-nav) flex flex-col gap-4 sm:gap-8 md:gap-20 xl:flex-row xl:items-end">
          <Canvas setPalette={setPalette} setCustomPalette={setCustomPalette} />
          {palette.length ? (
            <Palette palette={palette} customPalette={customPalette} />
          ) : null}
        </div>

        {palette.length ? <Toolbar toolbarRef={toolbarRef} /> : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
