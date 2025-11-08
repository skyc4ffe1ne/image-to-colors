import { Copy, Check } from "./icons.tsx";
import { useState, useEffect } from "react";
import type {
  PaletteProps,
  PaletteSectionProps,
  ButtonCopyProps,
} from "../lib/types";
import Button from "./Button";

function ButtonCopy({ paletteType, palette }: ButtonCopyProps) {
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

  async function handleCopy(type: "primary" | "secondary" | "custom") {
    let paletteString;
    switch (type) {
      case "primary":
        paletteString = palette.splice(0, 5).join("\n");
        break;

      case "secondary":
        paletteString = palette.splice(5).join("\n");
        break;

      case "custom":
        paletteString = palette.join("\n");
        break;
    }

    try {
      await navigator.clipboard.writeText(paletteString);
      setCopy(true);
    } catch (error) {
      setCopy(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <Button
      variant="inherit"
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

function PaletteSection({
  title,
  palette,
  handleSingleCopy,
  paletteType,
}: PaletteSectionProps) {
  return (
    <div className="border-border bg-secondary text-secondary-foreground mb-8 w-fit rounded-xl border p-2 sm:p-4">
      <header className="mb-2 flex items-center justify-between sm:mb-4">
        <h3 className="text-base sm:text-2xl"> {title}</h3>
        <ButtonCopy paletteType={paletteType} palette={palette} />
      </header>
      <div className="bg-background/30 flex gap-4 rounded-2xl px-4 py-2 shadow-sm sm:px-8 sm:py-4">
        {palette.map((color, i) => (
          <div
            key={i}
            style={{ backgroundColor: color }}
            className="group relative size-9 rounded-full inset-ring inset-ring-white/10 sm:size-12"
            onClick={() => handleSingleCopy(color)}
          >
            <p className="bg-background/5 absolute -top-7 left-1/2 z-100 hidden -translate-x-1/2 rounded-md px-2 py-1 font-mono text-xs whitespace-nowrap shadow-md transition-all duration-100 ease-in group-hover:block starting:-top-4 starting:opacity-0">
              {color}
            </p>
            <Copy className="absolute top-1/2 left-1/2 z-100 hidden size-5 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 mix-blend-difference invert-100 transition-[scale,opacity] duration-75 ease-in group-hover:block starting:scale-75 starting:opacity-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Palette({ palette, customPalette }: PaletteProps) {
  async function handleSingleCopy(color: string) {
    try {
      await navigator.clipboard.writeText(color);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(0,402px))] gap-x-4 xl:gap-x-0">
      <PaletteSection
        title="Primary Colors"
        palette={palette.slice(0, 5)}
        handleSingleCopy={handleSingleCopy}
        paletteType="primary"
      />

      <PaletteSection
        title="Secondary Colors"
        palette={palette.slice(5)}
        handleSingleCopy={handleSingleCopy}
        paletteType="secondary"
      />

      <PaletteSection
        title="Custom Colors"
        palette={customPalette}
        handleSingleCopy={handleSingleCopy}
        paletteType="custom"
      />
    </div>
  );
}
