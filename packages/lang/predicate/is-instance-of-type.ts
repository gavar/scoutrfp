export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isBoolean(value: any): value is boolean {
  return typeof value === "boolean";
}

export function isNumber(value: any): value is number {
  return typeof value === "number";
}

export function isString(value: any): value is string {
  return typeof value === "string";
}

export function isSymbol(value: any): value is symbol {
  return typeof value === "symbol";
}

export function isArray<T>(value: any): value is T[] {
  return value instanceof Array;
}

export function isObject<K = any>(value: Partial<K>): value is object & K {
  return value instanceof Object;
}

export function isFunction<T extends Function = Function>(value: any, type: T = Function as any): value is T {
  return value instanceof type;
}

/*** Whether given value is <code>null</code> or <code>undefined</code>. */
export function isNullOrUndefined(value: any): value is void | null {
  return isNull(value) || isUndefined(value);
}

export function isInstanceOfType<T = void>(value: any, type: "undefined"): value is undefined;
export function isInstanceOfType<T = void>(value: any, type: "null"): value is null;
export function isInstanceOfType<T = void>(value: any, type: "boolean"): value is boolean;
export function isInstanceOfType<T = void>(value: any, type: "number"): value is number;
export function isInstanceOfType<T = void>(value: any, type: "string"): value is string;
export function isInstanceOfType<T = void>(value: any, type: "symbol"): value is symbol;
export function isInstanceOfType<T = void>(value: any, type: "object"): value is object;
export function isInstanceOfType<T = void>(value: any, type: "array"): value is T[];
export function isInstanceOfType<T = void>(value: any, type: "function"): value is Function;
export function isInstanceOfType<T extends Function>(value: any, type: T): value is T;

export function isInstanceOfType<T = void>(value: any, type: string | Function): boolean {
  switch (typeof type) {
    case "string":
      return types[type as string](value);
    case "function":
      return value instanceof (type as Function);
    default:
      throw Error("unknown type: " + type);
  }
}

const types = {
  undefined: isUndefined,
  null: isNull,
  boolean: isBoolean,
  number: isNumber,
  string: isString,
  symbol: isSymbol,
  object: isObject,
  array: isArray,
  function: isFunction,
};
