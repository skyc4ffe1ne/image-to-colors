import { useState, useRef } from "react"

import { convertColors } from "./utils/convertColors.js"

import Canvas from "./components/Canvas.jsx"
import Palette from "./components/Palette.jsx"
import Toolbar from "./components/Toolbar.jsx"
import Modal from "./components/Modal.jsx"
function App() {
  const [palette, setPalette] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [typePalette, setTypePalette] = useState(undefined)

  const toolbarRef = useRef(null)

  function handleShowModal(e) {
    if (e === false) return setShowModal((sm) => sm = false)
    let activeModal = e.target.dataset.colors
    setShowModal((sm) => sm = sm === activeModal ? false : activeModal)
  }


  function handleSetTypePalette(e) {
    let numberPalette = e.target.dataset.tab
    let refactorPalette = numberPalette === "0" ? palette.map((el) => el[0]) : convertColors(palette)
    setTypePalette((tp) => tp = refactorPalette)
  }

  return (
    <div className="bg-black min-h-screen w-full flex items-center flex-col gap-12 pb-8 text-gray-200">

      <div className="flex xl:flex-row flex-col lg:gap-8 mt-20 items-center ">
        <Canvas setPalette={setPalette} />
        {palette.length ? <Palette palette={palette} /> : ""}
      </div>

      {palette.length ? <Toolbar handleShowModal={handleShowModal} toolbarRef={toolbarRef} /> : ""}

      {showModal && <Modal typePalette={typePalette} handleShowModal={handleShowModal} showModal={showModal} handleSetTypePalette={handleSetTypePalette} palette={palette} toolbarRef={toolbarRef} />}

    </div>
  )
}

export default App
