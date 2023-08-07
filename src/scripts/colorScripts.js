const rgbToHex = (rgb) => {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const colorSplited = rgb.split(",");

  const redHex = componentToHex(parseInt(colorSplited[0]));
  const greenHex = componentToHex(parseInt(colorSplited[1]));
  const blueHex = componentToHex(parseInt(colorSplited[2]));

  return "#" + redHex + greenHex + blueHex;
};

const isRGBFormat = (input) => {
  if (typeof input !== "string") {
    return false;
  }

  const values = input.split(",");

  if (values.length !== 3) {
    return false;
  }

  for (const value of values) {
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 255) {
      return false;
    }
  }

  return true;
};

module.exports = { rgbToHex, isRGBFormat };
