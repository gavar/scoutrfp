/**
 * ISO 4217 (3 letter) currency code.
 * @see https://en.wikipedia.org/wiki/ISO_4217
 * @see https://www.iso.org/iso-4217-currency-codes.html
 * @see https://www.currency-iso.org/dam/downloads/lists/list_one.xml
 */
export type CurrencyCode = string;

/**
 * Object literal containing currency rates, where key is {@link CurrencyCode}.
 * @see CurrencyCode
 */
export interface Rates {
  [currency: string]: number;
}

/**
 * Latest currency exchange rates response structure.
 */
export interface Latest {
  base: string;
  date: string;
  rates: Rates,
}
