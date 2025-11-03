import type { ButtonProps } from "../lib/types.ts";

export default function Button({
  children,
  type = "inherit",
  size = "base",
  className = "",
  ...props
}: ButtonProps) {
  const d =
    "disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer outline-none ";

  const styleButton = {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/80 ",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 ",
      accent: "bg-accent text-accent-foreground hover:bg-accent/80 ",
      link: "bg-background hover:bg-background/80 text-foreground border border-red-400 ",
      inherit: "bg-inherit text-inherit ",
    },
    size: {
      base: "py-2 px-5 rounded-full h-[48px] sm:px-6 font-medium  text-lg ",
      sm: "px-3 tracking-tight min-h-8 rounded-lg ",
      icon: "py-2 px-3 ",
    },
  };

  return (
    <button
      className={
        d + styleButton.variant[type] + styleButton.size[size] + className
      }
      {...props}
    >
      {children}
    </button>
  );
}
