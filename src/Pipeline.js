// src/Pipeline.js

const tap = require("./tap");
const pipe = require("./pipe");
const compose = require("./compose");
const pipeAsync = require("./pipeAsync");
const composeAsync = require("./composeAsync");

/**
 * Pipeline()
 *
 * A chainable functional pipeline builder.
 */
function Pipeline() {
  const steps = [];

  return {
    // -------------------------
    // SYNC PIPE
    // -------------------------

    pipe(fn) {
      steps.push({ type: "sync", fn });
      return this;
    },

    compose(...fns) {
      // compose means functions run right-to-left,
      // but we push them into the step list in order.
      const composed = compose(...fns);
      steps.push({ type: "sync", fn: composed });
      return this;
    },

    tap(sideEffectFn) {
      steps.push({ type: "sync", fn: tap(sideEffectFn) });
      return this;
    },

    // -------------------------
    // ASYNC PIPE
    // -------------------------

    pipeAsync(fn) {
      steps.push({ type: "async", fn });
      return this;
    },

    tapAsync(sideEffectFn) {
      const tapped = async (value) => {
        await sideEffectFn(value);
        return value;
      };
      steps.push({ type: "async", fn: tapped });
      return this;
    },

    composeAsync(...fns) {
      const composed = composeAsync(...fns);
      steps.push({ type: "async", fn: composed });
      return this;
    },

    // -------------------------
    // EXECUTION
    // -------------------------

    run(initialValue) {
      // Ensure no async steps exist
      const hasAsync = steps.some((s) => s.type === "async");
      if (hasAsync) {
        throw new Error(
          "Pipeline contains async steps. Use runAsync() instead.",
        );
      }

      // Build sync pipeline
      const fns = steps.map((s) => s.fn);
      return pipe(...fns)(initialValue);
    },

    async runAsync(initialValue) {
      let value = initialValue;

      for (const step of steps) {
        value = await step.fn(value);
      }

      return value;
    },
  };
}

module.exports = Pipeline;
