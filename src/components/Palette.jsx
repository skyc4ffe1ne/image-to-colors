export default function Palette({ palette }) {

  return (
    <div className="flex flex-col">

      <div className="mb-8 border p-4 border-neutral-800 rounded-xl">
        <h3 className="text-gray-200 text-2xl mb-4"> Primary Colors</h3>
        <div className="flex gap-4 bg-gray-400 px-8 py-4 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
          {palette.map((el, i) =>
            i < 5 ? <div style={{ backgroundColor: el[0] }} className="rounded-full w-12 h-12"></div> : ""
          )}
        </div>
      </div>

      <div className="mb-8 border p-4 border-neutral-800 rounded-xl cursor-pointer">
        <div className="flex w-full justify-between">
          <h3 className="text-gray-200 text-2xl mb-4"> Secondary Colors </h3>
        </div>
        <div className="flex gap-4 bg-gray-400 px-8 py-4 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
          {palette.map((el, i) =>
            i > 5 ? <div style={{ backgroundColor: el[0] }} className="rounded-full w-12 h-12"></div> : ""
          )}
        </div>
      </div>

    </div >


  )
}
