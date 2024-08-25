import Button from "./Button.jsx"
const labelModal = ["Rgb", "Hex"]

export default function Modal({ typePalette, showModal, handleSetTypePalette, palette }) {
  //palette fallback.
  const activePalette = typePalette || (palette.map((el) => el[0]));

  return (
    <div className="p-4 border backdrop-blur-3xl bg-white/30 rounded-lg border-neutral-800 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <header className="flex items-center gap-2 mb-6">
        {labelModal.map((el, i) =>
          <Button type="modalBtn" key={i} i={i} handleSetTypePalette={handleSetTypePalette}>
            {el}
          </Button>
        )}
      </header>

      <div className="border border-neutral-800 w-full p-4 rounded-xl text-gray-300">
        <div className="flex flex-col">
          {showModal === "0" && activePalette.map((el, i) => i < 5 ? <p key={i} style={{ backgroundColor: el }} ><span className="mix-blend-difference">{el}</span></p> : "")}
          {showModal === "1" && activePalette.map((el, i) => i > 5 ? <p key={i}> hello</p> : "")}
          {showModal === "2" && activePalette.map((el, i) => <p key={i}> {el}</p>)}
        </div>
      </div>

    </div >
  )
}
