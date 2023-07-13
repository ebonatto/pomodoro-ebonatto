let baseColor = "#f3f3f3";

let theme = createTheme(baseColor);
console.log(theme);
console.log(formatCSSTheme(theme));

function createTheme(baseColor) {
  baseColor = HEXToHSL(baseColor);
  secondaryColor = [...baseColor];
  secondaryColor[2] += 5;
  tertiaryColor = [...baseColor];
  tertiaryColor[1] -= 9;
  tertiaryColor[2] -= 4;
  selectColor = [...baseColor];
  selectColor[2] -= 14;

  return [
    HSLToHex(baseColor[0], baseColor[1], baseColor[2]),
    HSLToHex(secondaryColor[0], secondaryColor[1], secondaryColor[2]),
    HSLToHex(tertiaryColor[0], tertiaryColor[1], tertiaryColor[2]),
    HSLToHex(selectColor[0], selectColor[1], selectColor[2]),
  ];
}

function formatCSSTheme(theme) {
  return `{
        --base-color: ${theme[0]};
        --secondary-color: ${theme[1]};
        --tertiary-color: ${theme[2]};
        --select-color: ${theme[3]};
      }`;
}

function HEXToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  //   var colorInHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";
  var colorInHSL = [h, s, l];
  return colorInHSL;
}

function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
