import {
  getBreakpointCssValue,
  getBreakpointMinMax,
  getFontMaxRem,
  roundToDecimal,
} from "../../../../lib/gld-fluid-typography/util/fluidTypography";
import { expect, test } from "vitest";

test("roundToDecimal gives correct decimal", () => {
  expect(roundToDecimal(1.2345)).toBe(1.23);
});

test("getFontMaxRem gives Rem to 4 d.p", () => {
  expect(getFontMaxRem(320, 480)).toBe(1.5);
  expect(getFontMaxRem(480, 768)).toBe(1.6);
  expect(getFontMaxRem(768, 1200)).toBe(1.5625);
});

test("getBreakpointCssValue gives valid string", () => {
  expect(getBreakpointCssValue(320, 480)).toBe(
    "min(1.5rem /* 24px */,max(1rem /* 16px */,5vw))"
  );
  expect(getBreakpointCssValue(480, 768)).toBe(
    "min(1.6rem /* 25.6px */,max(1rem /* 16px */,3.33vw))"
  );
  expect(getBreakpointCssValue(768, 1200)).toBe(
    `min(1.5625rem /* 25px */,max(1rem /* 16px */,2.08vw))`
  );
  expect(getBreakpointCssValue(1200, 1920)).toBe(
    `min(1.6rem /* 25.6px */,max(1rem /* 16px */,1.33vw))`
  );
});
//getBreakpointMinMax
test("getBreakpointMinMax maps breakpoints correctly", () => {
  const correctArray = [
    [320, 480],
    [480, 768],
    [768, 1200],
    [1200, 1920],
  ];
  //Arrays are same length
  expect(getBreakpointMinMax().length).toBe(correctArray.length);
  // All values match
  for (let row = 0; row < correctArray.length; row += 1) {
    for (let col = 0; col < correctArray[0].length; col += 1) {
      expect(getBreakpointMinMax()[col][row]).toBe(correctArray[col][row]);
    }
  }
});
