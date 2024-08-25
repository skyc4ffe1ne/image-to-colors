import { useState } from "react"

import Button from "./Button.jsx"
import { convertColors } from ".././utils/ConvertColors.js"
const labelModal = ["Rgb", "Hex"]

export default function Modal({ palette, typePalette }) {
  const [tab, setTab] = useState(0)

  function handleTab(e) {
    const actualTab = Number(e.target.dataset.tab)
    console.log(actualTab)
    setTab((t) => t = actualTab)
  }
  if (tab) convertColors(palette)


  return (
    <div className="p-4 border backdrop-blur-3xl bg-white/30 rounded-lg border-neutral-800 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <header className="flex items-center gap-2 mb-6" onClick={(e) => handleTab(e)}>
        {labelModal.map((el, i) =>
          <Button type="modalBtn" key={i} i={i}>
            {el}
          </Button>
        )}
      </header>

      <div className="border border-neutral-800 w-full p-4 rounded-xl text-gray-300">
        <div className="flex flex-col">
          {typePalette === 0 && palette.map((el, i) => i < 5 ? <p key={i} style={{ backgroundColor: el[0] }} ><span className="mix-blend-difference">{el[0]}</span></p> : "")}
          {typePalette === 1 && palette.map((el, i) => i > 5 ? <p key={i}> {el[0]}</p> : "")}
          {typePalette === 2 && palette.map((el, i) => <p key={i}> {el[0]}</p>)}
        </div>
      </div>

    </div >
  )
}
