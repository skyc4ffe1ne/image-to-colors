export default function ActiveTab({ el, i }) {
  return (
    <>
      {i === 0 ? (
        <>
          <h3> Primary Colors </h3>
          <p style={{ backgroundColor: el }} className="rounded px-2"> <span className="mix-blend-difference"> {el}</span></p>
        </>
      )
        : i === 5 ? (
          <>
            <h3> Secondary Colors </h3>
            <p style={{ backgroundColor: el }} className="rounded px-2"> <span className="mix-blend-difference"> {el}</span></p>
          </>
        )
          : <p style={{ backgroundColor: el }} className="rounded px-2"> <span className="mix-blend-difference"> {el}</span></p>
      }
    </>
  )
}

