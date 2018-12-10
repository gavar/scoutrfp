import $ from "expect";
import { Comparator, CompareValues, KeyType } from "expect";
import * as extensions from "jest-dom";

export interface Expect extends ThisType<typeof $> {
  <T>(value: T): Expectation<T>;
}

export interface Expectation<T> {
  toExist(message?: string): this;
  toBeTruthy(message?: string): this;
  toNotExist(message?: string): this;
  toBeFalsy(message?: string): this;
  toBeNull(message?: string): this;
  toBeDefined(message?: string): this;
  toBeUndefined(message?: string): this;

  toBe(value: T, message?: string): this;
  toNotBe(value: any, message?: string): this;
  toEqual(value: any, message?: string): this;
  toNotEqual(value: any, message?: string): this;
  toThrow(error?: {}, message?: string): this;
  toNotThrow(error?: {}, message?: string): this;

  toBeA(value: string | {}, message?: string): this;
  toBeAn(value: string | {}, message?: string): this;
  toNotBeA(value: string | {}, message?: string): this;
  toNotBeAn(value: string | {}, message?: string): this;
  toMatch(value: string | RegExp | {}, message?: string): this;
  toNotMatch(value: string | RegExp | {}, message?: string): this;
  toMatchObject(value: {}, message?: string): this;

  toBeLessThan(value: number, message?: string): this;
  toBeLessThanOrEqualTo(value: number, messasge?: string): this;
  toBeFewerThan(value: number, message?: string): this;
  toBeGreaterThan(value: number, message?: string): this;
  toBeGreaterThanOrEqualTo(value: number, messasge?: string): this;
  toBeMoreThan(value: number, message?: string): this;

  toInclude<U>(value: any, compareValues?: CompareValues<U>, message?: string): this;
  toContain<U>(value: any, compareValues?: CompareValues<U>, message?: string): this;
  toExclude<U>(value: any, compareValues?: CompareValues<U>, message?: string): this;
  toNotContain<U>(value: any, compareValues?: CompareValues<U>, message?: string): this;

  toIncludeKeys(keys: KeyType[], comparator?: Comparator, message?: string): this;
  toContainKeys(keys: KeyType[], comparator?: Comparator, message?: string): this;
  toExcludeKeys(keys: KeyType[], comparator?: Comparator, message?: string): this;
  toNotContainKeys(keys: KeyType[], comparator?: Comparator, message?: string): this;
  toNotIncludeKeys(keys: KeyType[], comparator?: Comparator, message?: string): this;
  toIncludeKey(key: KeyType, comparator?: Comparator, message?: string): this;
  toContainKey(key: KeyType, comparator?: Comparator, message?: string): this;
  toExcludeKey(key: KeyType, comparator?: Comparator, message?: string): this;
  toNotContainKey(key: KeyType, comparator?: Comparator, message?: string): this;
  toNotIncludeKey(key: KeyType, comparator?: Comparator, message?: string): this;

  toHaveBeenCalled(message?: string): this;
  toNotHaveBeenCalled(message?: string): this;
  toHaveBeenCalledWith(...args: any[]): this;
  toHaveBeenLastCalledWith(...args: any[]): this;

  toBeInTheDocument(): this
  toBeVisible(): this
  toBeEmpty(): this
  toBeDisabled(): this
  toContainElement(element: HTMLElement | SVGElement | null): this
  toContainHTML(htmlText: string): this
  toHaveAttribute(attr: string, value?: string): this
  toHaveClass(...classNames: string[]): this
  toHaveFocus(): this
  toHaveFormValues(expectedValues: { [name: string]: any }): this
  toHaveStyle(css: string): this
  toHaveTextContent(
    text: string | RegExp,
    options?: { normalizeWhitespace: boolean },
  ): this

  not: this;
}

// extensions
$.extend(extensions);

// re-export
export const expect = $ as (Expect & typeof $);
