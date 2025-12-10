const { isFunction, ensureFunctions } = require("../src/utils/validate");

describe("validate.js", () => {
  test("isFunction returns true for functions", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
  });

  test("isFunction returns false for non-functions", () => {
    expect(isFunction(5)).toBe(false);
    expect(isFunction("hi")).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
  });

  test("ensureFunctions throws if input is not an array", () => {
    expect(() => ensureFunctions(123, "pipe")).toThrow();
    expect(() => ensureFunctions("abc", "compose")).toThrow();
  });

  test("ensureFunctions throws on non-function elements", () => {
    expect(() => ensureFunctions([1, 2, 3], "pipe")).toThrow(
      "pipe expected all arguments to be functions",
    );

    expect(() => ensureFunctions([() => {}, "bad"], "compose")).toThrow(
      "compose expected all arguments to be functions",
    );
  });

  test("ensureFunctions passes when all values are functions", () => {
    const fns = [(x) => x, (y) => y + 1, (z) => z * 2];
    expect(() => ensureFunctions(fns, "pipe")).not.toThrow();
  });
});
