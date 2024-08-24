const regex = /(?<=\().+,.+,.+(?=\))/gm

export const convertColors = function(palette) {
  let newPaletteHex = {}
  let restDivision = []
  const onlyRgb = palette.map(el => el[0])

  let scomposeRgb = onlyRgb.map((el) => {
    return el.match(regex).join("")
  })

  for (let i = 0; i < onlyRgb.length; i++) {
    let actualNumber = onlyRgb[i].split(",")
    if (actualNumber < 9) 
  }

}
