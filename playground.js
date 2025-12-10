const { pipe, compose, tap } = require("./src");

const add1 = (x) => x + 1;
const double = (x) => x * 2;
const log = tap(console.log);

console.log("PIPE RESULT:");
const pipeResult = pipe(add1, log, double)(5);
console.log(pipeResult); // <-- print final result

console.log("COMPOSE RESULT:");
const composeResult = compose(double, log, add1)(5);
console.log(composeResult); // <-- print final result
