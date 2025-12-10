const pipe = require("../src/pipe");
const tap = require("../src/tap");

describe("pipe()", () => {
  test("runs functions left-to-right", () => {
    const add1 = (x) => x + 1;
    const double = (x) => x * 2;

    const result = pipe(add1, double)(5);
    expect(result).toBe(12); //(5 + 1) * 2
  });

  test("handles 3 or more functions", () => {
    const result = pipe(
      (x) => x + 1,
      (x) => x * 2,
      (x) => x - 3,
    )(10);

    expect(result).toBe(19);
  });

  test("thorows on non-function arguments", () => {
    expect(() => pipe(1, (x) => x)).toThrow();
    expect(() => pipe("hi", (x) => x)).toThrow();
  });

  test("works with tap()", () => {
    let tapped = null;
    const record = (x) => {
      tapped = x;
    };

    const add1 = (x) => x + 1;
    const triple = (x) => x * 3;

    const result = pipe(
      add1, //5 -> 6
      tap(record), // record(6)
      triple, // 6 -> 18
    )(5);

    expect(tapped).toBe(6);
    expect(result).toBe(18);
  });
});
