const Pipeline = require("../src/Pipeline");
const tap = require("../src/tap");

describe("Pipeline()", () => {
  test("runs sync pipe operations", () => {
    const result = Pipeline()
      .pipe((x) => x + 1)
      .pipe((x) => x * 2)
      .run(5);

    expect(result).toBe(12);
  });

  test("runs sync compose operations", () => {
    const result = Pipeline()
      .compose(
        (x) => x * 2,
        (x) => x + 1,
      ) // (5 + 1) * 2
      .run(5);

    expect(result).toBe(12);
  });

  test("runs tap inside sync pipeline", () => {
    let tapped = null;

    const result = Pipeline()
      .pipe((x) => x + 1)
      .tap((v) => {
        tapped = v;
      })
      .pipe((x) => x * 3)
      .run(5);

    expect(tapped).toBe(6);
    expect(result).toBe(18);
  });

  test("prevents run() when async steps exist", () => {
    expect(() => Pipeline().pipeAsync(async (x) => x)(5)).toThrow();
  });

  test("mixes sync + async steps in runAsync()", async () => {
    const result = await Pipeline()
      .pipe((x) => x + 1)
      .pipeAsync(async (x) => x * 2)
      .runAsync(10);

    expect(result).toBe(22);
  });

  test("async tap works", async () => {
    let tapped = null;

    const result = await Pipeline()
      .pipeAsync(async (x) => x + 1)
      .tapAsync(async (v) => {
        tapped = v;
      })
      .pipeAsync(async (x) => x * 3)
      .runAsync(5);

    expect(tapped).toBe(6);
    expect(result).toBe(18);
  });
});
