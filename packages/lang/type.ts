import { Abstract } from "./abstract";
import { Newable } from "./newable";
import { isFunction } from "./predicate";

/**
 * Defines key to use for type definition association.
 */
export type TypeKey<T = any> =
  | Newable<T>
  | Abstract<T>
  | symbol
  | string
  ;

export namespace TypeKey {
  /**
   * Whether specified object is compatible with object represented by {@link InterfaceType}.
   * @param object - object to check.
   */
  export function is<T>(object: Partial<TypeKey<T>>): object is TypeKey<T> {
    switch (typeof object) {
      case "string":
      case "symbol":
      case "function":
        return true;
      default:
        return false;
    }
  }

  /**
   * Get name of the type key.
   * @param key - type key defining type identity.
   */
  export function name<T>(key: TypeKey<T>): string {
    return isFunction(key) ? key.name : key as string;
  }
}

/**
 * Type identifier for runtime types affected by type erasure (interfaces, type definitions, etc).
 * Possible way to use interface as type, thankfully to typescript declaration merging feature.
 *
 * Consider following example code:
 *
 * @example
 * import { TypeKey } from "$lang";
 * export interface Example { ... }
 * export namespace Example {
 *   export const $type: TypeKey<Example> = Symbol("Example");
 * }
 */
export interface InterfaceType<T = any> {
  /** Value to use to uniquely identify interface type */
  readonly $type: TypeKey<T>;
}

export namespace InterfaceType {
  /**
   * Whether specified object is compatible with object represented by {@link InterfaceType}.
   * @param object - object to check.
   */
  export function is<T>(object: TypeDef<T>): object is InterfaceType<T> {
    return object && TypeKey.is((object as InterfaceType<T>).$type);
  }

  /**
   * Whether two object of {@link InterfaceType} type referencing the same type.
   * @param a - first object to compare.
   * @param b - second object to compare.
   */
  export function equal(a: InterfaceType, b: InterfaceType): boolean {
    return a === b || a.$type && b.$type && a.$type === b.$type;
  }
}

/**
 * Type definition which allows to identify interfaces as a types.
 * @see VirtualType
 */
export type TypeDef<T = any> =
  | InterfaceType<T>
  | TypeKey<T>
  ;

/**
 * Utility function for {@link TypeDef}.
 */
export namespace TypeDef {
  /**
   * Whether specified object is compatible with object represented by {@link TypeDef}.
   * @param object - object to check.
   */
  export function is<T>(object: TypeDef<T>): object is TypeDef<T> {
    return object
      && TypeDef.is(object)
      || InterfaceType.is(object as InterfaceType);
  }
}

/**
 * Defines a function that returns {@link Type}.
 * Helps to resolve problem of NodeJS cyclic imports.
 */
export type TypeProvider<T = any> = () => Type<T>;

export namespace TypeProvider {
  /** Whether given value is instance of {@link TypeProvider}. */
  export function is<T>(object: TypeRef<T>): object is TypeProvider<T> {
    return isFunction(object)
      && !object.prototype // should not have prototype
      ;
  }
}

/**
 * Union of {@link Type} and {@link TypeProvider} helping to avoid recursive imports.
 */
export type TypeRef<T = any> = Type<T> | TypeProvider<T>;

export namespace TypeRef {

  /** Extract {@link Type} from the given {@link TypeRef}. */
  export function resolve<T>(ref: TypeRef<T>): Type<T> {
    if (TypeProvider.is(ref))
      ref = ref();

    return ref;
  }
}

/**
 * Defines object which has {@link Symbol.hasInstance} property.
 */
export interface Recognizable<T = any> extends Function {
  [Symbol.hasInstance](object: Partial<T>): object is T;
}

/**
 * Defines object which can be used against <code>instanceof</code> operator.
 */
export type Type<T = any> = T extends Newable ? T :
  | Newable.$<T>
  | Abstract<T>
  | Recognizable<T>
  ;

export namespace Type {

  /**
   * Get key which could be used for type association.
   * @param type - type definition.
   */
  export function key<T>(type: TypeDef<T>): TypeKey<T> {
    if (type) {
      if (TypeKey.is(type))
        return type;
      if (TypeKey.is((type as InterfaceType).$type))
        return type.$type;
    }
    return null;
  }

  /**
   * Get name of the type definition.
   * @param type - type definition.
   */
  export function name<T>(type: TypeDef<T>): string {
    return TypeKey.name(Type.key(type));
  }

  /**
   * Get type of the given object.
   * Alternative to a native <code>typeof</code>
   *
   * @param value - instance value of which to get type.
   * @param virtual - type to use if provided value doesn't have constructor and evaluates to 'object' type.
   */
  export function of<T>(value: T, virtual?: TypeDef<T>): TypeDef<T> {
    const type = typeof value;
    switch (type) {
      case "function":
        return value as any;
      case "object":
        // prefer interface type over object constructor
        if (virtual && value.constructor === Object)
          return virtual;

        // use object constructor as a type
        return value.constructor;
      default:
        return type;
    }
  }

  /**
   * Determines whether the {@param type} derives from {@param base} type.
   * @param type - type to check.
   * @param base - type to compare with.
   */
  export function isType<T>(type: TypeDef<T>, base: TypeDef<T>): boolean {
    // falsy?
    if (!type || !base)
      return false;

    // equal?
    if (type === base)
      return true;

    // prototype inheritance?
    if (isFunction(type))
      return isPrototypeOf(type, base as Function);

    // virtual?
    if (InterfaceType.is(type))
      return InterfaceType.equal(type, base as InterfaceType);

    return false;
  }

  function isPrototypeOf(type: Function, base: Function) {
    return base.prototype && base.prototype.isPrototypeOf(type);
  }
}
