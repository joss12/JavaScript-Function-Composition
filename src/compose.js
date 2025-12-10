//src/compose.js

const { ensureFunctions } = require("./utils/validate");

/**
 * compose(f1, f2, f3)
 *
 * Returns:
 * input => f1(f2(f3(input)))
 *
 * this is right-to-left composition
 */

function compose(...fns) {
  //validate input once
  ensureFunctions(fns, "compose");

  return function (initialValue) {
    //Right-to-left = reverse order
    return fns.reduceRight((value, fn) => {
      return fn(value);
    }, initialValue);
  };
}

module.exports = compose;
