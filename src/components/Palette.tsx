import type { PaletteProps } from "../lib/types";
import Button from "./Button";

function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export default function Palette({ palette }: PaletteProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-8 border p-4 border-border rounded-xl bg-secondary text-secondary-foreground">
        <header className="mb-4 flex justify-between items-center">
          <h3 className="text-2xl "> Primary Colors</h3>
          <Button type="inherit" size="icon">
            <Copy className="size-5" />
          </Button>
        </header>
        <div className="flex gap-4 bg-background/30 shadow-sm px-8 py-4 rounded-2xl">
          {palette.map((el, i) =>
            i < 5 ? (
              <div
                key={i}
                style={{ backgroundColor: el.color }}
                className="rounded-full size-12 inset-ring inset-ring-white/10"
              ></div>
            ) : (
              ""
            ),
          )}
        </div>
      </div>

      <div className="mb-8 border p-4 border-border rounded-xl bg-secondary text-secondary-foreground">
        <header className="mb-4 flex justify-between items-center">
          <h3 className="text-2xl "> Secondary Colors</h3>
          <Button type="inherit" size="icon">
            <Copy className="size-5" />
          </Button>
        </header>
        <div className="flex gap-4 bg-background/30  shadow-sm px-8 py-4 rounded-2xl ">
          {palette.map((el, i) =>
            i >= 5 ? (
              <div
                key={i}
                style={{ backgroundColor: el.color }}
                className="rounded-full size-12 inset-ring inset-ring-white/10"
              ></div>
            ) : (
              ""
            ),
          )}
        </div>
      </div>
    </div>
  );
}
