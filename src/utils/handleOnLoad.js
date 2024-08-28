export const handleOnLoad = function(canvas, img, ctx) {

  const aspectRatio = img.width / img.height
  const newWidth = canvas.width
  const newHeigth = canvas.width / aspectRatio
  canvas.height = newHeigth
  ctx.drawImage(img, 0, 0, newWidth, newHeigth)

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  //data return an Uint8ClampedArray, the value rappresent a rgba color ([26,49,90,255,26,49,90,255....])
  //rgba(26,49,90,255)

  let colorPalette = {}
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const approxColor = approximateColor(r, g, b);

    colorPalette[approxColor] = (colorPalette[approxColor] || 0) + 1
    //[0,0,0] : 0
    //[0,0,0] : 0 + 1
    //[0,0,0] : 1 + 1
  }


  const sortedColors = Object.entries(colorPalette).sort((a, b) => b[1] - a[1]);
  //Object.entries return ["rgb(0,0,0)", "832"] sort only the first index

  let mostUsedColors = sortedColors.splice(0, 10)
  console.log(mostUsedColors.length)

  for (let i = 0; i < mostUsedColors.length; i++) {
    mostUsedColors[i] = { ...mostUsedColors[i] }
  }
  return mostUsedColors
}


const roundColorValue = function(value, interval) {
  return Math.floor(value / interval) * interval;
}

const approximateColor = function(r, g, b, interval = 16) {
  return `rgb(${roundColorValue(r, interval)}, ${roundColorValue(g, interval)}, ${roundColorValue(b, interval)})`;
}

