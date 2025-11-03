import type { CanvasProps } from "../lib/types";
import { useState, useRef, useEffect } from "react";
import { handleOnLoad } from ".././utils/handleOnLoad";
import Button from "./Button";
import { useTheme } from "../contexts/ThemeProvider";

export default function Canvas({ setPalette }: CanvasProps) {
  const [picture, setPicture] = useState(null);

  let canvasColorRef = useRef<null | HTMLCanvasElement>(null);
  let canvasRef = useRef<null | HTMLCanvasElement>(null);
  let inputRef = useRef<null | HTMLInputElement>(null);
  let pickedColorRef = useRef<null | HTMLDivElement>(null);
  // Using the on clikc on the button,
  // instead of the label/input file.
  function linkingInput() {
    console.log("In thest input, click the button non the label");
    if (inputRef.current === null) return;
    inputRef.current.click();
  }

  function handleFile() {
    if (inputRef.current === null) return;
    const input = inputRef.current;
    setPicture((p) => (p = input.files[0]));
  }

  function handleDrop(e) {
    setPicture((p) => (p = e.dataTransfer.files[0]));
  }

  useEffect(() => {
    if (canvasRef.current === null) return;

    const canvas = canvasRef.current;
    canvas.width = 700;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "var(--foreground)";
    ctx.fillText("Drop Image", 280, 75);

    function pickColor(e) {
      // console.log("e:", e);
      let pX = e.offsetX;
      let pY = e.offsetY;
      let imageData = ctx.getImageData(pX - 24, pY - 24, 48, 48);

      let color = imageData.data.join(",");
      pickedColorRef.current.style.background = `rgba(${color})`;
      // pickedColorRef.current.style.top = `${pY - 24}px`;
      // pickedColorRef.current.style.left = `${pX - 24}px`;
      if (canvasColorRef.current === null) return;

      const canvasColor = canvasColorRef.current;
      const context = canvasColor.getContext("2d") as CanvasRenderingContext2D;

      context.putImageData(imageData, 0, 0);
    }

    if (picture) {
      const img = new Image();
      img.src = URL.createObjectURL(picture);
      img.onload = () => {
        let mostUsedColors = handleOnLoad(canvas, img, ctx);
        setPalette(mostUsedColors);
      };
      canvas.addEventListener("mousemove", pickColor);
    }

    return () => {
      canvas.removeEventListener("mousemove", pickColor);
    };
  }, [picture]);

  return (
    <div className="flex items-center px-2 sm:px-4 md:px-10">
      <div>
        <h1 className="text-foreground text-6xl pb-8 text-left text-balance max-w-3xl tracking-tight">
          Visualize the colors from your favorite image
        </h1>

        <Button type="primary" onClick={linkingInput}>
          Upload Image
        </Button>

        <input
          type="file"
          className="hidden "
          accept="image/png, image/jpeg, image/jpg"
          id="filePicture"
          ref={inputRef}
          onChange={(e) => handleFile(e)}
        />

        <div
          className="relative mt-16"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleFile(e)}
          />

          <div className="w-fit rounded-xl relative">
            <canvas
              ref={canvasRef}
              className="border border-border rounded-xl"
            ></canvas>

            <div
              className="absolute bottom-0 left-0 z-100 size-12 rounded-full border border-border grid place-content-center "
              ref={pickedColorRef}
            />

            <canvas
              className="absolute top-0 -right-12 border border-red-400 z-50 rounded-xl"
              ref={canvasColorRef}
              width="48"
              height="48"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
