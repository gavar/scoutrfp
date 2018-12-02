/**
 * Defines abstract object, that doesn't have constructor.
 */
export interface Abstract<T = any> extends Function {
  /** @inheritDoc */
  prototype: T;
}
