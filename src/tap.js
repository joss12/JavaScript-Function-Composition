// src/tap.js

const { isFunction } = require("./utils/validate");

/**
 * tap(sideEffectFn)
 *
 * Creates a function that:
 * 1. Receives a value
 * 2. Calls sideEffectFn(value)
 * 3. Returns the same value unchanged
 *
 * This is useful for debugging inside pipe() or compose().
 */

function tap(sideEffectFn) {
  if (!isFunction(sideEffectFn)) {
    throw new TypeError("tap() expect a function as its a argument.");
  }

  return function (value) {
    sideEffectFn(value); //perfom side effect
    return value; //DO NOT modify the chain!
  };
}

module.exports = tap;
