export default function Button({ children, backgroundLabel, colorLabel, type, i }) {
  const styleButton = {
    labelBtn: `${backgroundLabel} ${colorLabel} py-2 px-4 rounded-full tracking-tight `,
    modalBtn: "px-3 tracking-tight min-h-8 bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg",
  }

  return (
    <button className={styleButton[type]} data-tab={type === "modalBtn" ? i : undefined}>
      {children}
    </button >
  )
}
