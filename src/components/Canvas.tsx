import type { CanvasProps } from "../lib/types";
import { useState, useRef, useEffect } from "react";
import { handleOnLoad } from ".././utils/handleOnLoad";
import Button from "./Button";

const POINTER_SIZE = 48;

type RandomPoints = {
  x: number;
  y: number;
  ref: React.RefObject<HTMLDivElement | null>;
  color: string;
};

export default function Canvas({ setPalette, setCustomPalette }: CanvasProps) {
  const [picture, setPicture] = useState<null | File>(null);
  const [randomPoints, setRandomPoints] = useState<RandomPoints[]>([]);
  const [flagActivePoint, setFlagActivePoint] = useState<boolean>(false);

  let inputRef = useRef<null | HTMLInputElement>(null);

  let canvasColorRef = useRef<null | HTMLCanvasElement>(null);
  let ctxColorRef = useRef<null | CanvasRenderingContext2D>(null);

  let canvasRef = useRef<null | HTMLCanvasElement>(null);
  let ctxRef = useRef<null | CanvasRenderingContext2D>(null);

  let pickedColorRef_0 = useRef<null | HTMLDivElement>(null);
  let pickedColorRef_1 = useRef<null | HTMLDivElement>(null);
  let pickedColorRef_2 = useRef<null | HTMLDivElement>(null);
  let pickedColorRef_3 = useRef<null | HTMLDivElement>(null);
  let pickedColorRef_4 = useRef<null | HTMLDivElement>(null);

  let rColorRef = useRef<null | HTMLLIElement>(null);
  let gColorRef = useRef<null | HTMLLIElement>(null);
  let bColorRef = useRef<null | HTMLLIElement>(null);

  let buttonRef = useRef<null | HTMLButtonElement>(null);

  // Using the on click on the button,
  // instead of the label/input file.
  function linkingInput() {
    if (inputRef.current === null) return;
    inputRef.current.click();
  }

  function handleFile() {
    if (inputRef.current === null) return;
    const input = inputRef.current;

    if (!input || !input.files || !input.files.length) return;
    setPicture(input.files[0]);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    setPicture((p) => (p = e.dataTransfer.files[0]));
  }

  ////////////////////////
  // Example
  ///////////////////////
  // const testPalette = document.createElement("div");
  //
  // testPalette.style.position = "absolute";
  // testPalette.style.zIndex = "999";
  // testPalette.style.background = "blue";
  // testPalette.style.width = "10px";
  // testPalette.style.height = "10px";
  // testPalette.classList.add("testPalette");

  ////////////////////////
  // UTILS
  ///////////////////////
  function chooseRef(
    idx: 0 | 1 | 2 | 3 | 4,
  ): React.RefObject<HTMLDivElement | null> {
    switch (idx) {
      case 0:
        return pickedColorRef_0;
      case 1:
        return pickedColorRef_1;
      case 2:
        return pickedColorRef_2;
      case 3:
        return pickedColorRef_3;
      case 4:
        return pickedColorRef_4;
    }
  }

  // Initialize Canvas
  // and spread it globally
  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctxRef.current = ctx;
  }, []);

  // Initialize CanvasColor and spread it globally
  useEffect(() => {
    if (canvasColorRef.current === null) return;
    const canvasColor = canvasColorRef.current;
    const ctxColor = canvasColor.getContext("2d") as CanvasRenderingContext2D;
    if (!ctxColor) return;
    ctxColorRef.current = ctxColor;
  }, []);

  useEffect(() => {
    if (canvasRef.current === null || ctxRef.current === null) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    canvas.width = 700;
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "var(--foreground)";
    ctx.fillText("Drop Image", 280, 75);

    function createCustomPalette() {
      let randomPoints = Array.from({ length: 5 }, (_, idx) => {
        const pointIDX = idx as 0 | 1 | 2 | 3 | 4;
        // Avoid that the circle can go out - only the half of it can go outside.
        // Because the maximum color that we can took is the middle of the pointer.
        let pX = Math.floor(Math.random() * (canvas.width - POINTER_SIZE / 2));
        let pY = Math.floor(Math.random() * (canvas.height - POINTER_SIZE / 2));
        let choosedRef = chooseRef(pointIDX);
        let { data } = ctx.getImageData(pX, pY, 1, 1);
        const onlyRGB = data.slice(0, 3);
        let color = onlyRGB.join(",");
        return { x: pX, y: pY, ref: choosedRef, color };
      });
      setRandomPoints(randomPoints);
      setCustomPalette(randomPoints.map((el) => `rgb(${el.color})`));
    }

    if (picture) {
      const img = new Image();
      img.src = URL.createObjectURL(picture);
      img.onload = () => {
        let mostUsedColors = handleOnLoad(canvas, img, ctx);
        setPalette(mostUsedColors);
        createCustomPalette();
      };
    }
  }, [picture]);

  useEffect(() => {
    function activePoint(e: MouseEvent) {
      const target = e.target as HTMLDivElement;
      if (target && target.id && target.id.match("palette")) {
        // Remove the previous one
        document.querySelector(".active")?.classList.remove("active");
        const activePointID = target.id;
        document.querySelector("#" + activePointID)?.classList.add("active");
        setFlagActivePoint(true);
      }
    }
    window.addEventListener("mousedown", activePoint);

    return () => {
      window.removeEventListener("mousedown", activePoint);
    };
  }, []);

  useEffect(() => {
    if (
      canvasRef.current === null ||
      flagActivePoint === false ||
      ctxRef.current === null
    )
      return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const activePointer = document.querySelector(".active") as HTMLDivElement;

    function handleMovement(e: MouseEvent) {
      const pX = e.offsetX;
      const pY = e.offsetY;
      activePointer.style.left = pX - POINTER_SIZE / 2 + "px";
      activePointer.style.top = pY - POINTER_SIZE / 2 + "px";
    }

    function pickColor(e: MouseEvent) {
      if (
        canvasColorRef.current === null ||
        ctxColorRef.current === null ||
        rColorRef.current === null ||
        gColorRef.current === null ||
        bColorRef.current === null
      )
        return;
      const ctxColor = ctxColorRef.current;
      let pX = e.offsetX;
      let pY = e.offsetY;
      let imageData = ctx.getImageData(
        pX - POINTER_SIZE / 2,
        pY - POINTER_SIZE / 2,
        48,
        48,
      );

      let { data: rgba } = ctx.getImageData(
        pX - POINTER_SIZE / 2,
        pY - POINTER_SIZE / 2,
        1,
        1,
      );
      rColorRef.current.textContent = "R:" + rgba[0];
      gColorRef.current.textContent = "B:" + rgba[1];
      bColorRef.current.textContent = "G:" + rgba[2];

      ctxColor.putImageData(imageData, 0, 0);

      // Create and center the square
      const width = 10;
      const height = 10;
      const color = "white";
      const borderColor = "black";
      const borderSize = 1;

      let squareX = canvasColorRef.current.width / 2 - width / 2;
      let squareY = canvasColorRef.current.height / 2 - height / 2;

      ctxColor.strokeStyle = borderColor;
      ctxColor.strokeRect(
        squareX + borderSize,
        squareY + borderSize,
        width,
        height,
      );
      ctxColor.strokeStyle = color;
      ctxColor.strokeRect(squareX, squareY, width, height);
    }

    // Handle mouse uo event,
    // get the color from the image
    // update teh colorPalette
    // and the pointer background
    function handleStop() {
      let activePointStyle = window.getComputedStyle(activePointer);

      let pX_s = activePointStyle.getPropertyValue("left");
      let pY_s = activePointStyle.getPropertyValue("top");

      let getPX = pX_s.match(/\d+/g);
      let getPY = pY_s.match(/\d+/g);

      if (getPX === null || getPY === null) return;

      let pX = Number(getPX[0]);
      let pY = Number(getPY[0]);

      let { data } = ctx.getImageData(
        pX + POINTER_SIZE / 2,
        pY + POINTER_SIZE / 2,
        1,
        1,
      );
      const onlyRGB = data.slice(0, 3);
      const colorPicked = onlyRGB.join(",");
      let getPaletteID = activePointer.id;

      let paletteID = getPaletteID.at(-1);
      let paletteIDX = Number(paletteID);
      setFlagActivePoint(false);
      setCustomPalette((cp) => {
        const updatedPalette = cp.map((el, idx) =>
          idx === paletteIDX ? "rgb(" + colorPicked + ")" : el,
        );
        return updatedPalette;
      });

      setRandomPoints((rp) => {
        const updatedPoints = rp.map((el, idx) =>
          idx === paletteIDX ? { ...el, color: colorPicked } : el,
        );
        return updatedPoints;
      });
    }
    canvas.addEventListener("mousemove", handleMovement);
    canvas.addEventListener("mousemove", pickColor);
    window.addEventListener("mouseup", handleStop);
    return () => {
      canvas.removeEventListener("mousemove", pickColor);
      canvas.removeEventListener("mousemove", handleMovement);
      window.removeEventListener("mouseup", handleStop);
    };
  }, [flagActivePoint]);

  function hoverEffect(e: React.MouseEvent) {
    if (buttonRef.current === null) return;

    const btnStyle = buttonRef.current.getBoundingClientRect();

    const updateBackgroundY =
      ((e.clientY - btnStyle.top) * 100) / btnStyle.height;
    const updateBackgroundX =
      ((e.clientX - btnStyle.left) * 100) / btnStyle.width;

    buttonRef.current.style.setProperty("--top", updateBackgroundY + "%");
    buttonRef.current.style.setProperty("--left", updateBackgroundX + "%");
  }
  return (
    <div className="">
      <h1 className="text-foreground max-w-3xl pb-8 text-left text-4xl/9 tracking-tighter text-balance sm:text-5xl lg:text-6xl">
        Visualize the colors from your favorite image
      </h1>

      <Button
        variant="primary"
        onClick={linkingInput}
        onMouseMove={(e: React.MouseEvent) => hoverEffect(e)}
        ref={buttonRef}
        className="bg-radial-[at_var(--left)_var(--top)] from-[(--color-primary)/95] to-(--color-primary) to-50%"
      >
        Upload Image
      </Button>

      <div
        className="relative mt-16"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          id="filePicture"
          ref={inputRef}
          onChange={handleFile}
        />

        <div
          className="relative flex w-fit flex-col gap-4 rounded-xl lg:flex-row"
          id="cont_canvas"
        >
          {picture &&
            randomPoints.map(({ x, y, ref, color }, idx) => (
              <div
                id={"palette" + idx}
                key={idx}
                ref={ref}
                className={`absolute z-100 grid cursor-grab place-content-center rounded-full border border-white text-xl text-white active:cursor-grabbing`}
                style={{
                  width: POINTER_SIZE + "px",
                  height: POINTER_SIZE + "px",
                  top: y - POINTER_SIZE / 2 + "px",
                  left: x - POINTER_SIZE / 2 + "px",
                  background: `rgb(${color})`,
                }}
              />
            ))}

          <canvas
            ref={canvasRef}
            className="border-border rounded-xl border"
          ></canvas>

          <div className="bg-background border-border h-fit w-fit rounded-md border px-2 py-2">
            <h3 className="text-muted-foreground font-mono text-xs/6 font-medium tracking-widest uppercase">
              Color Picker
            </h3>

            <div className="flex items-center gap-2">
              <canvas
                className="border-border rounded-xl border"
                ref={canvasColorRef}
                width="48"
                height="48"
              />

              <ul className="text-secondary-foreground flex min-w-10 flex-col gap-0.5 font-mono text-[10px] font-medium">
                <li ref={rColorRef}> R:</li>
                <li ref={gColorRef}> G:</li>
                <li ref={bColorRef}> B:</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
