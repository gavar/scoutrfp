import { CurrencyCode } from "$/api";

/**
 * Currency conversion rate unit.
 */
export interface Rate {
  /** Base currency code. */
  base: CurrencyCode;
  /** Quote currency code. */
  quote: CurrencyCode;
  /** How much {@link quote} currency required to buy {@link base} currency. */
  rate: number;
}

/**
 * Store state of the latest exchange rates.
 */
export interface LatestState {
  /** Base currency code. */
  base: CurrencyCode;
  /** List of rates. */
  rates: Rate[];
  /** Whether currently fetching latest state. */
  fetching: boolean;
  /** Fetching error. */
  error?: Error,
}
