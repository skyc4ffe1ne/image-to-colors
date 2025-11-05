import { useState, useRef } from "react";
import { convertColors } from "./utils/convertColors.ts";

import Canvas from "./components/Canvas";
import Palette from "./components/Palette";
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";
import ToggleTheme from "./components/ToggleTheme.tsx";

function App() {
  const [palette, setPalette] = useState([]);
  const [customPalette, setCustomPalette] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typePalette, setTypePalette] = useState(undefined);
  const toolbarRef = useRef(null);

  console.log("customPalette:", customPalette)

  function handleShowModal(e) {
    let activeModal = e.target.dataset.colors;
    setShowModal((sm) => (sm = sm === activeModal ? false : activeModal));
  }

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
      <div className="bg-background min-h-screen w-full flex flex-col gap-12 text-foreground lg:[--spacing-nav:80px] [--spacing-nav:40px] px-2 sm:px-4 md:px-10">
        <ToggleTheme />

        <div className="flex xl:flex-row flex-col lg:gap-16 xl:items-end mt-(--spacing-nav)">
          <Canvas setPalette={setPalette} setCustomPalette={setCustomPalette} />
          {palette.length ? (
            <Palette palette={palette} customPalette={customPalette} />
          ) : null}
        </div>

        {palette.length ? (
          <Toolbar handleShowModal={handleShowModal} toolbarRef={toolbarRef} />
        ) : null}

        {showModal && (
          <Modal
            typePalette={typePalette}
            setShowModal={setShowModal}
            showModal={showModal}
            handleSetTypePalette={handleSetTypePalette}
            palette={palette}
            toolbarRef={toolbarRef}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
