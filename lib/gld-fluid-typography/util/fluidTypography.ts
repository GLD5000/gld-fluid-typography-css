/** Breakpoint minimums will equal 1rem / 16px
 * Fonts scale linearly to breakpoint maximums
 * Default base font size is
 * Default Min width is 320px
 * Default Max width is 1920px
 * Default breakpoints are 480px, 768px, 1200px
 * Default scales are 1.5x, 1.5625x, 1.6x
 * Default max font-sizes are 24px, 25px, 25.6px
 */
export function getFluidTypographyInternalCss(
  breakpoints = [480, 768, 1200],
  screenMinMax = [320, 1920],
  baseFontSize = 16
) {}
/**
 * Maps min and max screen sizes for given breakpoints and overall maximum / minimum
 */
export function getBreakpointMinMax(
  breakpoints = [480, 768, 1200],
  screenMinMax = [320, 1920]
) {
  const returnArray: number[][] = [];
  for (let i = 0; i < breakpoints.length + 1; i += 1) {
    const min = i === 0 ? screenMinMax[i] : breakpoints[i - 1];
    const max = i === breakpoints.length ? screenMinMax[1] : breakpoints[i];
    returnArray.push([min, max]);
  }
  return returnArray;
}
/**
 * Returns percentage of view width to 2 decimal places
 */
export function getFontViewWidth(
  baseFontSize: number,
  breakpointMinimum: number
) {
  return roundToDecimal(100 * (baseFontSize / breakpointMinimum));
}
/**
 * Returns maximum font size in REM for a breakpoint assuming linear scaling
 */
export function getFontMaxRem(
  breakpointMinimum: number,
  breakpointMaximum: number,
  baseFontSize = 16
) {
  const scaleFactor = breakpointMaximum / breakpointMinimum;
  return pixelsToRem(baseFontSize * scaleFactor);
}
/**
 * Returns a number rounded to a given number of decimal places (default is 2)
 */
export function roundToDecimal(numberToRound: number, decimalPlaces = 2) {
  const multiplier = 10 ** decimalPlaces;
  const reciprocal = 1 / multiplier;
  return Math.round(numberToRound * multiplier) * reciprocal;
}
/**
 * Returns the value portion of a CSS declaration with
 */
export function getBreakpointCssValue(
  breakpointMinimum: number,
  breakpointMaximum: number,
  baseFontSize = 16
) {
  const fontMaxRem = getFontMaxRem(
    breakpointMinimum,
    breakpointMaximum,
    baseFontSize
  );
  // .text-\[min\(1\.5rem\2c max\(1rem\2c 5vw\)\)\] {
  // font-size: min(1.5rem /* 24px */,max(1rem /* 16px */,5vw)) !important;
  // }
  return `min(${fontMaxRem}rem /* ${remToPixels(
    fontMaxRem
  )}px */,max(${pixelsToRem(
    baseFontSize
  )}rem /* ${baseFontSize}px */,${getFontViewWidth(
    baseFontSize,
    breakpointMinimum
  )}vw))`;
}
/**
 * Converts rem to pixels to 1 d.p
 */
function remToPixels(rem) {
  return roundToDecimal(rem * 16, 1);
}
/**
 * Converts pixels to rem to 4 d.p
 */
function pixelsToRem(rem) {
  return roundToDecimal(rem / 16, 4);
}
