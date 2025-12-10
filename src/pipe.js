//pipe.js

const { ensureFunctions } = require("./utils/validate");

/**
 *pipe(f1, f2, f3)
 *
 * Returns a new function:
 *  input => f3(f2(f1(input)))
 *
 *  This is left-to-rigth composition:
 *  first f1 runs,
 *  then f2,
 *  then f3.
 *
 *  pipe(f1,f2, f3)(value)
 *  is equivalent to:
 *  f3(f2(f1(value)))
 * */

function pipe(...fns) {
  //Validate input once - at composition time, not at execution time.
  ensureFunctions(fns, "pipe");

  return function (initialValue) {
    return fns.reduce((value, fn) => {
      return fn(value); //pass value forward
    }, initialValue);
  };
}

module.exports = pipe;
