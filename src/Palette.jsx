export default function Palette({ paletteObj, idx }) {

  return (
    <>
      {idx === 0 && (
        <div>
          <h2 className="text-gray-200 text-3xl"> Main Color </h2>
          <div style={{ backgroundColor: paletteObj[0] }} className="rounded-full w-8 h-8"></div>
        </div>
      )}
      {idx <= 6 && (
        <div style={{ backgroundColor: paletteObj[0] }} className="rounded-full w-8 h-8"></div>
      )}
    </>
  )
}
