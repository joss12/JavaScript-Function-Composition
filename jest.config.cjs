module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  moduleFileExtensions: ["js", "json"],

  //Coverage settings
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js", // optional to ignore re-export files
  ],
  coverageDirectory: "coverage",
  coverageRepporters: ["text", "lcov", "html"],

  //optional: enforce 100% coverage
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
