import Button from "./Button.jsx"

const labelColors = [
  {
    labelText: "Primary Colors",
    backgroundLabel: "bg-gray-200",
    colorLabel: "text-neutral-800"
  },
  {
    labelText: "Secondary Colors",
    backgroundLabel: "bg-black",
    colorLabel: "text-gray-200"
  },
  {
    labelText: "All Colors",
    backgroundLabel: "bg-blue-400",
    colorLabel: "text-neutral-800"
  },
]
export default function Toolbar({ handleShowModal, handleSetTypePalette }) {
  return (
    <>
      <div className="fixed bottom-8 left-[1/2] min-w-126 h-16 backdrop-blur-md bg-white/30 rounded-xl flex items-center justify-between gap-4 px-4">
        {labelColors.map((el, i) =>
          <Button key={i} backgroundLabel={el.backgroundLabel} colorLabel={el.colorLabel} type="labelBtn" i={i} handleShowModal={handleShowModal} handleSetTypePalette={handleSetTypePalette}> {el.labelText} </Button>
        )}
      </div>


    </>
  )
}
