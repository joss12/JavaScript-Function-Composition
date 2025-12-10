// src/pipeAsync.js

const { ensureFunctions } = require("./utils/validate");

/**
 *pipeAsync(f1, f2, f3)
 *
 * Returns: async input => result
 *
 * Executes left-to-rigth, awaiting each step.
 * Supports both sync and sync functions.
 *
 */

function pipeAsync(...fns) {
  ensureFunctions(fns, "pipeAsync");

  return async function (initialValue) {
    let value = initialValue;

    for (const fn of fns) {
      value = await fn(value); //await even if fn is sync
    }
    return value;
  };
}

module.exports = pipeAsync;
