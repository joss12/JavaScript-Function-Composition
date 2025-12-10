const compose = require("../src/compose");
const tap = require("../src/tap");

describe("compose()", () => {
  test("runs functions right-to-left", () => {
    const add1 = (x) => x + 1;
    const double = (x) => x * 2;

    const result = compose(add1, double)(5);
    expect(result).toBe(11); // double(5)=10 → add1(10)=11
  });

  test("handles 3 or more functions", () => {
    const result = compose(
      (x) => x - 3, // last
      (x) => x * 2, // middle
      (x) => x + 1, // first
    )(10);

    // Steps:
    // (10 + 1) = 11
    // 11 * 2 = 22
    // 22 - 3 = 19
    expect(result).toBe(19);
  });

  test("throws on non-function arguments", () => {
    expect(() => compose(1, (x) => x)).toThrow();
    expect(() => compose("bad", (x) => x)).toThrow();
  });

  test("works with tap()", () => {
    let tapped = null;
    const record = (x) => {
      tapped = x;
    };

    const result = compose(
      (x) => x * 3, // after tap
      tap(record), // second
      (x) => x + 1, // first
    )(5);

    expect(tapped).toBe(6);
    expect(result).toBe(18);
  });
});
