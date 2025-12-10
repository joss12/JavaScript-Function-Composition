// src/composeAsync.js

const { ensureFunctions } = require("./utils/validate");

/**
 * composeAsync(f1, f2, f3)
 *
 * works like compose(), but awaits every step.
 * Executes right-to-left.
 */
function composeAsync(...fns) {
  ensureFunctions(fns, "composeAsync");

  return async function (initialValue) {
    let value = initialValue;

    for (let i = fns.length - 1; i >= 0; i--) {
      value = await fns[i](value);
    }

    return value;
  };
}

module.exports = composeAsync;
