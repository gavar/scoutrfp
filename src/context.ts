import { ExchangeService } from "./api";

/**
 * Simple dependency container.
 * Explicitly defines set of services available to a application.
 */
export interface Context {
  exchange: ExchangeService
}

/**
 * Create and configure application context.
 */
export function configureContext(): Context {
  return {
    exchange: new ExchangeService(),
  };
}
