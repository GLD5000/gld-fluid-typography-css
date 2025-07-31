export type FluidTypographySettingsType = {
  breakpoints: number[];
  screenMinMax: number[];
  baseFontSize: number;
};

export const defaultFluidTypographySettings = {
  breakpoints: [480, 768, 1200],
  screenMinMax: [320, 1920],
  baseFontSize: 16,
};

/** 
 * Fonts scale linearly to breakpoint maximums
 * @default min width is 320px
 * @default max width is 1920px
 * @default base font size is 16px
 * @default max font-sizes are 24px, 25px, 25.6px
 * @default breakpoints are 480px, 768px, 1200px
 * @default scales are 1.5x, 1.5625x, 1.6x
 */
export function getFluidTypographyInternalCss(
  fluidTypographySettings = defaultFluidTypographySettings
) {
  const { breakpoints, screenMinMax, baseFontSize } = fluidTypographySettings;
  const breakpointMinMax = getBreakpointMinMax(breakpoints, screenMinMax);
  const breakpointCssValues = breakpointMinMax.map((minMax) => {
    const [min, max] = minMax;
    return getBreakpointCssValue(min, max, baseFontSize);
  });
}
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
 * Returns the CSS declaration with media query as needed
 */
export function getBreakpointCssDeclarations(
  breakpointMinMax: number[][],
  breakpointCssValues: string[],
  uniqueClassName = "gld-fluid-typo-wrapper"
) {
  const declarations = breakpointMinMax.map((minMax, index) =>
    getBreakpointCssDeclaration(
      minMax[0],
      index,
      uniqueClassName,
      breakpointCssValues[index]
    )
  );
  return declarations.join("\n");
}
export function getBreakpointCssDeclaration(
  min: number,
  index: number,
  breakpointCssValue: string,
  uniqueClassName: string = "gld-fluid-typo-wrapper"
) {
  const declaration = `.${uniqueClassName} { font-size: ${breakpointCssValue} !important; }`;
  return index === 0 ? declaration : wrapInMediaQuery(declaration, min);
}

/**
 * Wraps a declaration string in a min-width media query for a specified min
 */
function wrapInMediaQuery(declaration: string, min: number) {
  return `@media (min-width: ${min}px) { ${declaration} }`;
}

// @media (min-width: 480px) {
// .phablet\:text-\[min\(1\.6rem\2c max\(1rem\2c 3\.33vw\)\)\] {
// font-size: min(1.6rem /* 25.6px */,max(1rem /* 16px */,3.33vw)) !important;
// }
// }

/**
 * Converts rem to pixels to 1 d.p
 */
function remToPixels(rem: number) {
  return roundToDecimal(rem * 16, 1);
}
/**
 * Converts pixels to rem to 4 d.p
 */
function pixelsToRem(rem: number) {
  return roundToDecimal(rem / 16, 4);
}
