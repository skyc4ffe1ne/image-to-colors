import { useState } from "react"

import Canvas from "./components/Canvas.jsx"
import Palette from "./components/Palette.jsx"
import Toolbar from "./components/Toolbar.jsx"
import Modal from "./components/Modal.jsx"
function App() {

  const [palette, setPalette] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [typePalette, setTypePalette] = useState(0)

  function handleShowModal() {
    setShowModal((s) => !s)
  }


  function handleSetTypePalette(e) {
    let colorsType = Number(e.target.dataset.colors)
    //0 -> primary
    //1 -> secondary
    //2 -> all
    console.log(colorsType)
    setTypePalette((tp) => tp = colorsType)
  }

  return (
    <div className="bg-black min-h-screen w-full flex items-center flex-col gap-12 pb-4 text-gray-200">

      <div className="flex xl:flex-row flex-col lg:gap-8 mt-20 items-center ">
        <Canvas setPalette={setPalette} />
        {palette.length ? <Palette palette={palette} /> : ""}
      </div>

      {palette.length ? <Toolbar handleShowModal={handleShowModal} handleSetTypePalette={handleSetTypePalette} /> : ""}

      {showModal && <Modal palette={palette} typePalette={typePalette} />}

    </div>
  )
}

export default App
