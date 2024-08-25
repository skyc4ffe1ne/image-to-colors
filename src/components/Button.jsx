
export default function Button({ children, backgroundLabel, colorLabel, type, i, handleShowModal, handleSetTypePalette }) {
  const styleButton = {
    labelBtn: `${backgroundLabel} ${colorLabel} py-2 px-4 rounded-full tracking-tight `,
    modalBtn: "px-3 tracking-tight min-h-8 bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg",
  }

  return (
    <>
      {type === "labelBtn" ? (
        <button className={styleButton[type]} onClick={(e) => { handleShowModal(); handleSetTypePalette(e) }} data-colors={i} >
          {children}
        </button >
      ) : (
        <button className={styleButton[type]} data-tab={i}>
          {children}
        </button>
      )
      }
    </>
  )
}

{/*
export default function Button({ children, backgroundLabel, colorLabel, type, i, handleShowModal}) {
  const styleButton = {
    labelBtn: `${backgroundLabel} ${colorLabel} py-2 px-4 rounded-full tracking-tight `,
    modalBtn: "px-3 tracking-tight min-h-8 bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg",
  }

  return (
    <button className={styleButton[type]} data-tab={type === "modalBtn" ? i : undefined} onClick={type === "labelBtn" ? handleShowModal : ""}>
      {children}
    </button >
  )
}



*/}
