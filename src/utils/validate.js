//src/utils/validate.js

/**
 * Check if a value is a function
 */

function isFunction(fn) {
  return typeof fn == "function";
}

/**
 * Ensures all items in fnArray are function
 *
 * Why return a function instead of throwing immediately?
 * Because pipe() and compose() call validation ONLY at creation time.
 */

function ensureFunctions(fnArray, context = "unknown") {
  if (!Array.isArray) {
    throw new TypeError(`${context} expects an array of function.`);
  }

  fnArray.forEach((fn, index) => {
    if (!isFunction(fn)) {
      const type = typeof fn;
      throw new TypeError(
        `${context} expected all arguments to be functions.
                Received ${type} at position ${index}.`,
      );
    }
  });
}

module.exports = {
  isFunction,
  ensureFunctions,
};
