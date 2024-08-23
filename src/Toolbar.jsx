import Button from "./Button.jsx"
import { motion } from "framer-motion"

const labelColors = ["Primary Colors", "Secondary Colors", "Others Colors", "All Colors"]

export default function Toolbar() {

  return (
    <>
      {/*  
      <div className="fixed bottom-8 left-[1/2] min-w-126 h-16 bg-neutral-800 rounded-xl flex items-center justify-between gap-4 px-4">
        {labelColors.map((el, i) =>
          <Button key={i}> {el} </Button>
        )}
      </div>

    */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          scale: [1, 1.5, 1],
          width: ["4rem", "4rem", "4rem", "4rem", "37.029rem"],
          opacity: [1, 1, 0.8, 0.8, 0],
          borderRadius: ["50%", "50%", "20%", "20%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        className="w-16 h-16 bg-neutral-800 absolute bottom-8 left-[1/2]"
      />

    </>
  )
}
