import { Copy, Check } from "./icons.tsx";
import { useState, useEffect } from "react";
import type { PaletteProps } from "../lib/types";
import Button from "./Button";

function ButtonCopy({ paletteType, palette, customPalette }) {
  const [copy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (copy === false) return;
    const timeoutID = setTimeout(() => {
      setCopy(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [copy]);

  async function handleCopy(type: "primary" | "secondary" | "custom"): void {
    let paletteString;
    switch (type) {
      case "primary":
        paletteString = palette.toSpliced(0, 5).join("\n");
        break;

      case "secondary":
        paletteString = palette.toSpliced(5).join("\n");
        break;

      case "custom":
        paletteString = customPalette.join("\n");
        break;
    }

    try {
      await navigator.clipboard.writeText(paletteString);
      setCopy(true);
    } catch (error) {
      setCopy(false);
      console.error(error.message);
    }
  }

  return (
    <Button
      type="inherit"
      size="icon"
      className="hover:bg-background/90 transition-[scale] duration-150 ease-in active:scale-90"
      onClick={() => handleCopy(paletteType)}
    >
      {copy ? (
        <Check className="size-5 scale-100 opacity-100 blur-none transition-[opacity,transform,filter] duration-300 ease-out starting:scale-75 starting:opacity-0 starting:blur-sm" />
      ) : (
        <Copy className="size-5 scale-100 blur-none transition-[opacity,transform,filter] duration-300 ease-out starting:scale-75 starting:opacity-0 starting:blur-sm" />
      )}
    </Button>
  );
}

export default function Palette({ palette, customPalette }: PaletteProps) {
  console.log("palette:", palette);

  async function handleSingleCopy(color: string) {
    try {
      await navigator.clipboard.writeText(color);
      setCopy(true);
    } catch (error) {
      setCopy(false);
      console.error(error.message);
    }
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(0,402px))] gap-x-4 xl:grid-cols-1 xl:gap-x-0">
      <div className="border-border bg-secondary text-secondary-foreground mb-8 w-fit rounded-xl border p-4">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl"> Primary Colors</h3>
          <ButtonCopy
            paletteType="primary"
            palette={palette}
            customPalette={customPalette}
          />
        </header>
        <div className="bg-background/30 flex gap-4 rounded-2xl px-8 py-4 shadow-sm">
          {palette.map((el, i) =>
            i < 5 ? (
              <div
                key={i}
                style={{ backgroundColor: el.color }}
                className="group relative size-12 rounded-full inset-ring inset-ring-white/10"
                onClick={() => handleSingleCopy(el.color)}
              >
                <p className="bg-background/5 absolute -top-7 left-1/2 z-100 hidden -translate-x-1/2 rounded-md px-2 py-1 font-mono text-xs whitespace-nowrap shadow-md transition-all duration-100 ease-in group-hover:block starting:-top-4 starting:opacity-0">
                  {el.color}
                </p>
                <Copy className="absolute top-1/2 left-1/2 z-100 hidden size-5 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 invert-100 transition-[scale,opacity] duration-75 ease-in group-hover:block starting:scale-75 starting:opacity-0" />
              </div>
            ) : (
              ""
            ),
          )}
        </div>
      </div>

      <div className="border-border bg-secondary text-secondary-foreground mb-8 w-fit rounded-xl border p-4">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl"> Secondary Colors</h3>
          <ButtonCopy
            paletteType="secondary"
            palette={palette}
            customPalette={customPalette}
          />
        </header>
        <div className="bg-background/30 flex gap-4 rounded-2xl px-8 py-4 shadow-sm">
          {palette.map((el, i) =>
            i >= 5 ? (
              <div
                key={i}
                style={{ backgroundColor: el.color }}
                className="group relative size-12 rounded-full inset-ring inset-ring-white/10"
              ></div>
            ) : (
              ""
            ),
          )}
        </div>
      </div>

      <div className="border-border bg-secondary text-secondary-foreground mb-8 w-fit rounded-xl border p-4">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl"> Custom colors</h3>
          <ButtonCopy
            paletteType="custom"
            palette={palette}
            customPalette={customPalette}
          />
        </header>
        <div className="bg-background/30 flex gap-4 rounded-2xl px-8 py-4 shadow-sm">
          {customPalette.map((el, i) => (
            <div
              key={i}
              style={{ backgroundColor: `rgb(${el})` }}
              className="size-12 rounded-full inset-ring inset-ring-white/10"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
