
# JavaScript Function Composition Engine

A powerful, lightweight functional programming engine for JavaScript with:
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)


- **pipe()** – left‑to‑right composition  
- **compose()** – right‑to‑left composition  
- **tap()** – side‑effect interceptor  
- **pipeAsync()** – async left‑to‑right pipelines  
- **composeAsync()** – async right‑to‑left pipelines  
- **Pipeline()** – chainable FP builder (sync + async)

This project mimics FP engines like Ramda, Lodash FP, and RxJS pipelines while remaining tiny, readable, and production‑ready.

---

## ✨ Features

### ✔ Function Composition
```js
pipe(f1, f2, f3)(value);
compose(f1, f2, f3)(value);
```

### ✔ Tap (Lodash‑style)
```js
pipe(add1, tap(console.log), double)(5);
```

### ✔ Full Async Support
```js
await pipeAsync(fetchUser, transform, save)(id);
```

### ✔ Chainable API
```js
const result = await Pipeline()
  .pipe(x => x + 1)
  .tap(console.log)
  .pipeAsync(async x => x * 2)
  .runAsync(10);
```

---

## 📦 Installation

```sh
npm install js-composition-engine
```

(Replace name if you publish with a different package name.)

---

## 📁 File Structure

```
src/
  index.js
  pipe.js
  compose.js
  tap.js
  pipeAsync.js
  composeAsync.js
  Pipeline.js
  utils/
    validate.js

test/
  *.test.js
```

---

## 🧠 Usage Examples

### Pipe
```js
const { pipe } = require("js-composition-engine");

const add1 = x => x + 1;
const double = x => x * 2;

console.log(pipe(add1, double)(5)); // 12
```

### Compose
```js
compose(f1, f2)(value) // f1(f2(value))
```

### Tap
```js
pipe(
  x => x + 1,
  tap(v => console.log("value:", v)),
  x => x * 3
)(5);
```

### Async Pipeline
```js
await pipeAsync(fetchData, parse, save)(url);
```

### Chainable API
```js
const value = await Pipeline()
  .pipe(x => x + 1)
  .tap(console.log)
  .pipeAsync(async x => x * 2)
  .runAsync(10);
```

---

## 🧪 Testing

```sh
npm test
npm run test:coverage
coverage/lcov-report/index.html
```

Includes full Jest coverage for:

- pipe  
- compose  
- tap  
- async pipelines  
- chainable Pipeline API  

---

## 🤝 Contributing

PRs welcome.  
Feel free to add operators such as:

- map  
- filter  
- delay  
- debounce  
- catchError  
- retry  

---

## 📄 License

MIT

---

## ⭐ Author

Built by an engineer passionate about functional programming and elegant system design.

