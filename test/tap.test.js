const tap = require("../src/tap");

describe("tap()", () => {
  test("executes the side effect function", () => {
    let captured = null;
    const record = (v) => {
      captured = v;
    };

    const tapped = tap(record);
    tapped(42);

    expect(captured).toBe(42);
  });

  test("returns the original value", () => {
    const doNothing = tap(() => {});
    const result = doNothing(99);

    expect(result).toBe(99);
  });

  test("throws when argument is not a function", () => {
    expect(() => tap(123)).toThrow();
    expect(() => tap("hello")).toThrow();
  });
});
