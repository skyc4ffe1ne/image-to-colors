import type { CanvasProps } from "../lib/types";
import { useState, useRef, useEffect } from "react";
import { handleOnLoad } from ".././utils/handleOnLoad";
import Button from "./Button";
import { createSquarePicker } from "../utils/utils";

const POINTER_SIZE = 48;

export default function Canvas({ setPalette, setCustomPalette }: CanvasProps) {
  const [picture, setPicture] = useState(null);
  const [randomPoints, setRandomPoints] = useState([]);
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
    setPicture((p) => (p = input.files[0]));
  }

  function handleDrop(e) {
    setPicture((p) => (p = e.dataTransfer.files[0]));
  }

  ////////////////////////
  // UTILS
  ///////////////////////
  function chooseRef(idx: 0 | 1 | 2 | 3 | 4) {
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

  function getColor(pX: number, pY: number) {
    let { data } = ctxRef.current.getImageData(pX, pY, 1, 1);
    const onlyRGB = data.slice(0, 3);
    return onlyRGB.join(",");
  }

  function pickColor(e: MouseEvent) {
    if (
      ctxColorRef.current === null ||
      canvasColorRef.current === null ||
      flagActivePoint === false ||
      ctxRef.current === null
    )
      return;
    let pX = e.offsetX;
    let pY = e.offsetY;
    let imageData = ctxRef.current.getImageData(pX - 24, pY - 24, 48, 48);
    ctxColorRef.current.putImageData(imageData, 0, 0);
    createSquarePicker(canvasColorRef.current, ctxColorRef.current);
  }

  // Initialize Canvas
  // and spread it globally
  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctxRef.current = ctx;
  }, []);

  // Initialize CanvasColor
  // and spread it globally
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
        // Avoid that the circle can go out - only the half of it can go outside.
        // Because the maximum color that we can took is the middle of the pointer.
        let pX = Math.floor(Math.random() * (canvas.width - POINTER_SIZE / 2));
        let pY = Math.floor(Math.random() * (canvas.height - POINTER_SIZE / 2));
        let choosedRef = chooseRef(idx);
        let color = getColor(pX, pY);
        return { x: pX, y: pY, ref: choosedRef, color };
      });
      setRandomPoints(randomPoints);
      setCustomPalette((cp) => (cp = randomPoints.map((el) => el.color)));
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
      if (e.target && e.target.id && e.target.id.match("palette")) {
        const activePointID = e.target.id;
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
    const activePointer = document.querySelector(".active");

    function handleMovement(e) {
      const pX = e.offsetX;
      const pY = e.offsetY;
      activePointer.style.left = pX - POINTER_SIZE / 2 + "px";
      activePointer.style.top = pY - POINTER_SIZE / 2 + "px";
    }

    // Handle mouse uo event,
    // get the color from the image
    // update teh colorPalette
    // and the pointer background
    function handleStop(e) {
      let activePointStyle = window.getComputedStyle(activePointer);

      let pX_s = activePointStyle.getPropertyValue("left");
      let pY_s = activePointStyle.getPropertyValue("top");
      let pX = Number(pX_s.match(/\d+/g)[0]);
      let pY = Number(pY_s.match(/\d+/g)[0]);

      let { data } = ctx.getImageData(
        pX + POINTER_SIZE,
        pY + POINTER_SIZE,
        1,
        1,
      );
      const onlyRGB = data.slice(0, 3);
      const colorPicked = onlyRGB.join(",");
      let paletteID = activePointer.id;
      let paletteIDX = paletteID.at(-1);
      setFlagActivePoint(false);
      setCustomPalette((cp) => {
        const updatedPalette = cp.map((el, idx) =>
          idx == paletteIDX ? colorPicked : el,
        );
        return updatedPalette;
      });

      setRandomPoints((rp) => {
        const updatedPoints = rp.map((el, idx) =>
          idx == paletteIDX ? { ...el, color: onlyRGB } : el,
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

  function hoverEffect(e: MouseMove) {
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
    <div className="flex items-center">
      <div>
        <h1 className="text-foreground max-w-3xl pb-8 text-left text-6xl tracking-tight text-balance">
          Visualize the colors from your favorite image
        </h1>

        <Button
          type="primary"
          onClick={linkingInput}
          onMouseMove={(e) => hoverEffect(e)}
          ref={buttonRef}
          className="bg-radial-[at_var(--left)_var(--top)] from-[(--color-primary)/95] to-(--color-primary) to-50%"
        >
          Upload Image
        </Button>

        <div
          className="relative mt-16"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            id="filePicture"
            ref={inputRef}
            onChange={(e) => handleFile(e)}
          />

          <div className="relative w-fit rounded-xl" id="cont_canvas">
            {picture &&
              randomPoints.map(({ x, y, ref, color }, idx) => (
                <div
                  id={"palette" + idx}
                  key={idx}
                  ref={ref}
                  className={`absolute z-100 grid place-content-center rounded-full border border-white`}
                  style={{
                    width: POINTER_SIZE + "px",
                    height: POINTER_SIZE + "px",
                    bottom: y + "px",
                    left: x + "px",
                    background: `rgb(${color})`,
                  }}
                />
              ))}
            <canvas
              ref={canvasRef}
              className="border-border rounded-xl border"
            ></canvas>
            <canvas
              className="absolute top-0 -right-12 z-50 rounded-xl border border-red-400"
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
