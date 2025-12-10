const composeAsync = require("../src/composeAsync");
const tap = require("../src/tap");

describe("composeAsync()", () => {
  test("runs async functions right-to-left", async () => {
    const add1 = async (x) => x + 1;
    const double = async (x) => x * 2;

    // composeAsync(f1, f2)(5) = f1(f2(5)) = add1(double(5))
    const result = await composeAsync(add1, double)(5);
    expect(result).toBe(11); //(5 * 2) + 1
  });

  test("mixes async * async functions", async () => {
    const add1 = (x) => x + 1; //sync
    const double = async (x) => x * 2; //async

    const result = await composeAsync(add1, double)(10);
    expect(result).toBe(21); //10(10 * 2) + 1
  });

  test("worker with tap()", async () => {
    let tapped = null;
    const record = (x) => {
      tapped = x;
    };

    const add1 = async (x) => x + 1;

    const result = await composeAsync(
      (x) => x * 3, //should run last
      tap(record), // tap receives 6
      add1, //first executed async step
    )(5);

    expect(tapped).toBe(6);
    expect(result).toBe(18);
  });

  test("throws for non-function arguments", () => {
    expect(() => composeAsync(123, (x) => x)).toThrow();
  });
});
