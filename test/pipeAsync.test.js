const pipeAsync = require("../src/pipeAsync");
const tap = require("../src/tap");

describe("pipeAsync()", () => {
  test("execute async functions left-to-right", async () => {
    const add1 = async (x) => x + 1;
    const double = async (x) => x * 2;

    const result = await pipeAsync(add1, double)(5);
    expect(result).toBe(12);
  });

  test("mixes async * async functions", async () => {
    const add1 = (x) => x + 1; //sync
    const double = async (x) => x * 2; //async

    const result = await pipeAsync(add1, double)(10);
    expect(result).toBe(22);
  });

  test("worker with tap()", async () => {
    let tapped = null;
    const record = (x) => {
      tapped = x;
    };

    const add1 = async (x) => x + 1;

    const result = await pipeAsync(
      add1,
      tap(record), // record should receive 6
      (x) => x * 3,
    )(5);

    expect(tapped).toBe(6);
    expect(result).toBe(18);
  });

  test("throws for non-function arguments", () => {
    expect(() => pipeAsync(123, (x) => x)).toThrow();
  });
});
