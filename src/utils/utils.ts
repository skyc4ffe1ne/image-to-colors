export function createSquarePicker(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
) {
  // Size and color of the square in the middle of the canvas
  const width = 10;
  const height = 10;
  const color = "white";

  // Create and center the square
  context.strokeStyle = color;
  context.strokeRect(
    canvas.width / 2 - width / 2,
    canvas.height / 2 - height / 2,
    width,
    height,
  );
}
