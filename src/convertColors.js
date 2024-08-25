const regex = /(?<=\().+,.+,.+(?=\))/gm;
const regexSpace = /\s/gm;

let newPaletteArr = [];

export const convertColors = function(palette) {
  const onlyRgb = palette.map(el => el[0]);

  let scomposeRgb = onlyRgb.map((el) => {
    return el.match(regex).join("")
  });

  newPaletteArr = scomposeRgb.map((el) => {
    const rgbArray = el.replace(regexSpace, "").split(",");

    const hexColor = rgbArray.map((value) => {
      let hex = parseInt(value).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");

    return `#${hexColor}`;
  });

  return newPaletteArr
};

