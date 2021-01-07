export enum colors {
  blue50 = "#2787ED",
  bluer70 = "#1F68B6",
  blue100 = "#11488B",

  blue20 = "#7F868C",

  grey80 = "#171F25",
  grey50 = "#242E37",
  grey40 = "#1B262E",
  grey30 = "#8C9196",
  grey10 = "#E0E0E0",
  grey60 = "#BAB9B7",
  grey65 = "#BDBDBD",

  brown20 = "#242424",

  red100 = "#B11818",
  red70 = "#AD2507",
  red10 = "#372424",

  black = "#000000",
  disabled = "#C4C4C4",
  darkBackground = "#EBEEEE",
  background = "#FFFFFF",
  white = "#FFFFFF",

  success = "#234543",
  error = "#BC3C3C",
  info = "#1A2C3D",
  transparent = "#0000",
}

/**
 * trasnlate percent to hex, in order to add to color hex o60 = 60% = 0.6 = 99
 */
export enum opacity {
  o30 = "4D", // 30%
  o39 = "63", // 39%
  o40 = "66", // 60%
  o60 = "99", // 60%
}

export const gradients = {
  bottomMain: ["rgba(0, 0, 0, 0.0)", "#171F25"],
  topMain: ["#171F25", "rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.0)"],
  mainGenres: ["rgba(0,0,0,0.00)", "rgba(0,0,0,0.00)", "rgba(0, 0, 0, 1)"],
};

export default colors;
