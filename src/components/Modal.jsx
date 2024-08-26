import { useRef, useEffect } from "react"
import Button from "./Button.jsx"
import ActiveTab from "./ActiveTab.jsx"

const labelModal = ["Rgb", "Hex"]

export default function Modal({ typePalette, showModal, handleSetTypePalette, palette, handleShowModal, toolbarRef }) {
  const modalRef = useRef(null)

  useEffect(function() {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target) && !toolbarRef.current.contains(e.target)) {
        handleShowModal(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [showModal])

  //palette fallback.
  const activePalette = typePalette || (palette.map((el) => el[0]));

  async function handleCopy() {
    let paletteString;
    if (showModal === "0") {
      paletteString = activePalette.toSpliced(5, 5).join("\n")
    } else if (showModal === "1") {
      paletteString = activePalette.toSpliced(0, 5).join("\n")
    } else {
      paletteString = activePalette.join("\n")
    }
    await navigator.clipboard.writeText(paletteString)
  }





  return (
    <div className="p-4 border backdrop-blur-3xl bg-white/30 rounded-lg border-neutral-800 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-[50vw]" ref={modalRef}>
      <header className="flex items-center gap-2 mb-6">
        {labelModal.map((el, i) =>
          <Button type="modalBtn" key={i} i={i} handleSetTypePalette={handleSetTypePalette}>
            {el}
          </Button>
        )}
      </header>

      <div className="border border-neutral-800 w-full p-4 rounded-xl text-gray-300 relative">
        <div className="absolute -top-4 right-4">
          <button
            className="px-2 rounded-lg bg-gray-200 text-gray-800 text-sm"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {showModal === "0" && activePalette.map((el, i) => i < 5 ? <ActiveTab key={i} i={i} el={el} /> : "")}
          {showModal === "1" && activePalette.map((el, i) => i >= 5 ? <ActiveTab key={i} i={i} el={el} /> : "")}
          {showModal === "2" && activePalette.map((el, i) => <ActiveTab key={i} i={i} el={el} />)}
        </div>
      </div>

    </div >
  )
}

