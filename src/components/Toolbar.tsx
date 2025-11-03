import { useRef } from "react";
import Button from "./Button";

function ColorPicker(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />
      <path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
      <path d="m2 22 .414-.414" />
    </svg>
  );
}

const labelColors = [
  {
    labelText: "Primary Colors",
    type: "primary",
  },
  {
    labelText: "Secondary Colors",
    type: "secondary",
  },
  {
    labelText: "All Colors",
    type: "accent",
  },
];
export default function Toolbar({ handleShowModal, toolbarRef }) {
  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 min-w-126 h-16 bg-background shadow-lg rounded-xl flex items-center justify-between gap-4 px-4"
      ref={toolbarRef}
    >
      <Button
        type="inherit"
        size="icon"
        className="border border-border rounded-md"
      >
        <ColorPicker className="size-5" />
      </Button>
    </div>
  );
}
