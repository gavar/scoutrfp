import { isFunction } from "$lang";

/***
 * Whether the target object has own property by a given key.
 * @param target - target to check whether it contains the property.
 * @param key - name of the function to look for.
 */
export function hasOwnProperty<K extends string, T = any>(target: object & Partial<Record<K, T>>, key: K): target is Record<K, T> {
  return target && target.hasOwnProperty(key);
}

/***
 * Whether the target object has function by a given key.
 * @param target - target to check whether it contains the function.
 * @param key - name of the function to look for.
 */
export function hasFunction<K extends string, T extends Function = Function>(target: Partial<Record<K, T>>, key: K): target is Record<K, T> {
  return target && isFunction(target[key]);
}
