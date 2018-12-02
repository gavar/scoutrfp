import { Abstract, isFunction, isString, Newable } from "$lang";
import { Logger } from "./logger";

/**
 * Manufactures logger instances.
 */
export interface LoggerFactory {
  /**
   * Get an appropriate {@link Logger} instance as specified by the {@param name} parameter.
   * @param name - the name of the Logger to return.
   * @returns a logger instance.
   */
  getLogger(name: string): Logger;
}

export namespace LoggerFactory {
  /**
   * Logger factory that provides loggers.
   * @default ConsoleLoggerFactory
   */
  export let factory: LoggerFactory;

  /**
   * Return a logger named corresponding to the type passed as parameter,
   * using the statically bound {@link LoggerFactory} instance.
   * @param type - the returned logger will be named after class or function.
   * @returns a logger instance.
   */
  export function getLogger(type: Abstract | Newable): Logger;

  /**
   * Return a logger named corresponding to the type of given instance
   * using the statically bound {@link LoggerFactory} instance.
   * @param object - the returned logger will be named after instance class.
   * @returns a logger instance.
   */
  export function getLogger(object: { constructor: Function }): Logger;

  /**
   * Get a logger named according to the name parameter,
   * using the statically bound {@link LoggerFactory} instance.
   * @param name - the name of the logger.
   * @returns a logger instance.
   */
  export function getLogger(name: string): Logger;

  /** @private */
  export function getLogger(type): Logger {
    const {factory} = LoggerFactory;

    if (arguments.length < 1)
      return factory.getLogger("");

    if (isString(type))
      return factory.getLogger(type);

    if (isFunction(type))
      return factory.getLogger((type as Function).name);

    if (isFunction(type.constructor))
      return factory.getLogger(type.constructor.name);

    return factory.getLogger(String(type));
  }
}
