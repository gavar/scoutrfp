import { isInstanceOfType } from "./is-instance-of-type";

const tests: any[][] = [
  // undefined
  [undefined, "undefined", true],
  [undefined, "null", false],
  [undefined, "boolean", false],
  [undefined, "number", false],
  [undefined, "string", false],
  [undefined, "symbol", false],
  [undefined, "object", false],
  [undefined, Object, false],
  [undefined, "function", false],
  [undefined, Function, false],
  // null
  [null, "undefined", false],
  [null, "null", true],
  [null, "boolean", false],
  [null, "number", false],
  [null, "string", false],
  [null, "symbol", false],
  [null, "object", false],
  [null, Object, false],
  [null, "function", false],
  [null, Function, false],
  // boolean
  [false, "undefined", false],
  [false, "null", false],
  [false, "boolean", true],
  [false, "number", false],
  [false, "string", false],
  [false, "symbol", false],
  [false, "object", false],
  [false, Object, false],
  [false, "function", false],
  [false, Function, false],
  // number
  [0, "undefined", false],
  [0, "null", false],
  [0, "boolean", false],
  [0, "number", true],
  [0, "symbol", false],
  [0, "string", false],
  [0, "object", false],
  [0, Object, false],
  [0, "function", false],
  [0, Function, false],
  // symbol
  [Symbol(), "undefined", false],
  [Symbol(), "null", false],
  [Symbol(), "boolean", false],
  [Symbol(), "number", false],
  [Symbol(), "symbol", true],
  [Symbol(), "string", false],
  [Symbol(), "object", false],
  [Symbol(), Object, false],
  [Symbol(), "function", false],
  [Symbol(), Function, false],
  // string
  ["string", "undefined", false],
  ["string", "null", false],
  ["string", "boolean", false],
  ["string", "number", false],
  ["string", "symbol", false],
  ["string", "string", true],
  ["string", "object", false],
  ["string", Object, false],
  ["string", "function", false],
  ["string", Function, false],
  // object
  [{}, "undefined", false],
  [{}, "null", false],
  [{}, "boolean", false],
  [{}, "number", false],
  [{}, "symbol", false],
  [{}, "string", false],
  [{}, "object", true],
  [{}, Object, true],
  [{}, "function", false],
  [{}, Function, false],
  // function
  [Function, "undefined", false],
  [Function, "null", false],
  [Function, "boolean", false],
  [Function, "number", false],
  [Function, "symbol", false],
  [Function, "string", false],
  [Function, "object", true],
  [Function, Object, true],
  [Function, "function", true],
  [Function, Function, true],
];

describe("isInstanceOfType:", () => {
  for (const test of tests) {
    const [value, type, expectation] = test;
    const name = `${(formatTypeNameOf(value))} instanceof ${formatTypeNameOf(type)} -> ${expectation}`;
    it(name, () => expect(isInstanceOfType(value, type)).toBe(expectation));
  }
});

function typeNameOf(value): string {

  if (typeof value === "string")
    return value;

  if (value instanceof Function && value !== Function)
    return value.name;

  return typeof value;
}

function formatTypeNameOf(value): string {
  return `'${typeNameOf(value)}'`.padEnd(11);
}
