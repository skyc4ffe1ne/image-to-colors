export const handleOnLoad = function(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
): string[] {
  const aspectRatio = img.width / img.height;
  const newWidth = canvas.width;
  const newHeight = canvas.width / aspectRatio;
  canvas.height = newHeight;
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //data return an Uint8ClampedArray, the value rappresent a rgba color ([26,49,90,255,26,49,90,255....])
  //rgba(26,49,90,255)

  let colorPalette: Record<string, number> = {};
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const approxColor = approximateColor(r, g, b);

    colorPalette[approxColor] = (colorPalette[approxColor] || 0) + 1;
    //[0,0,0] : 0
    //[0,0,0] : 0 + 1
    //[0,0,0] : 1 + 1
  }

  const sortedColors = Object.entries(colorPalette).sort((a, b) => b[1] - a[1]);
  //Object.entries -> ["rgb(0,0,0)", "832"] sort only the first index

  let mostUsedColors = sortedColors.splice(0, 10);

  for (let i = 0; i < mostUsedColors.length; i++) {
    // Only string rbg
    mostUsedColors[i] = mostUsedColors[i][0];

    // Object {color:"rbg(...)",repeat:102 }
    // mostUsedColors[i] = mostUsedColors[i].reduce((acc, el, idx) => {
    //   return idx === 0 ? { ...acc, color: el } : { ...acc, repeat: el };
    // },{});
  }
  return mostUsedColors;
};

const roundColorValue = function(value: number, interval: number): number {
  return Math.floor(value / interval) * interval;
};

const approximateColor = function(
  r: number,
  g: number,
  b: number,
  interval: number = 64,
): string {
  return `rgb(${roundColorValue(r, interval)}, ${roundColorValue(g, interval)}, ${roundColorValue(b, interval)})`;
};
