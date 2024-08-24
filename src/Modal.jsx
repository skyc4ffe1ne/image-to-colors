import { useState } from "react"

import Button from "./Button.jsx"
import { convertColors } from "./ConvertColors.js"
const labelModal = ["Hex", "Rgb", "Hsl"]

export default function Modal({ palette }) {
  const [tab, setTab] = useState(0)

  function handleTab(e) {
    const actualTab = Number(e.target.dataset.tab)
    setTab((t) => t = actualTab)
  }
  if (palette.length) convertColors(palette)


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
        <pre>
          {tab === 0 ?
            (
              <code>
                --text: #050315;
                {"\n"}--background: #fbfbfe;
                {"\n"}--primary: #2f27ce;
                {"\n"}--secondary: #dedcff;
                {"\n"}--accent: #433bff;
              </code>
            )
            : tab === 1 ?
              (
                <h3 className="text-red-400 text-4xl"> Rgb</h3>
              )
              :
              (
                <h3 className="text-green-400 text-4xl"> Hsl</h3>
              )
          }

        </pre>
      </div>
    </div>
  )
}
