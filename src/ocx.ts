/** A type alias representing an object with string keys and values of any type. */
export type ocxKey = { [key: string]: any };

/** A generic type that extends `T` with `ocxKey`, allowing `T` to have arbitrary key-value pairs. */
export type ocxAcc<T> = T & ocxKey;
/**
 * A flexible mapping type that can be an:
 * - plain object (`ocxKey`)
 * - array of objects (`ocxKey[]`)
 * - recursive mapping (`ocxMap[]`)
 * - primitive value (`string`, `number`, `null`, `boolean`, `undefined`)
 * - function that takes an optional object (`ocxKey`) and returns an `ocxMap`. */
export type ocxMap = ocxKey | ocxKey[] | ocxMap[] | string | number | null | boolean | undefined | ((key?: ocxKey) => ocxMap);

/** An object that can be processed by `ocx`. */
export type ocxObj<T> = T | ocxMap | ocxAcc<T>;

/**
 * Checks if a given value is a plain object (i.e., not an array or null).
 * @param value - The value to check.
 * @returns True if the value is a plain object, otherwise false.
 */
export function isPlainObject(value: unknown): value is ocxKey {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Merges multiple objects deeply, handling arrays and functions gracefully.
 * @template T - The base object type.
 * @param obj - One or more objects to merge.
 * @returns The deeply merged object.
 */
function baseOcx<T extends ocxKey>(...obj: ocxObj<T>[]): ocxAcc<T> {
  const seen = new WeakMap<object, object>(); // Use WeakMap to store processed objects

  function merge<T extends ocxKey>(acc: ocxAcc<T>, input: ocxObj<T>): ocxAcc<T> {
    if (!input) return acc;

    if (isPlainObject(input)) {
      if (seen.has(input)) return seen.get(input) as ocxAcc<T>; // If there is one, use previous result.
      const newAcc = { ...acc }; // Copy acc so as not to change direct references
      seen.set(input, newAcc); // Mark objects as processed
      acc = newAcc; // Use copied version
    }

    if (Array.isArray(input)) return { ...acc, ...baseOcx(...input) };

    if (typeof input === 'function') {
      const result = input(acc);
      return isPlainObject(result) ? merge(acc, result) : { ...acc, ...baseOcx(result) };
    }

    if (isPlainObject(input)) {
      Reflect.ownKeys(input).forEach(key => {
        const value = (input as any)[key];
        if (isPlainObject(value) && isPlainObject(acc[key as keyof T])) {
          acc[key as keyof T] = merge(acc[key as keyof T], value);
        } else {
          acc[key as keyof T] = value;
        }
      });
      return acc;
    }

    return acc;
  }

  return obj.reduce<ocxAcc<T>>((acc, input) => merge(acc, input), {} as ocxAcc<T>);
}

/**
 * Merges multiple objects deeply, handling arrays and functions gracefully **without overwriting**.
 * @template T - The base ocx type.
 * @param obj - One or more objects to merge.
 * @returns The deeply merged object **without overwriting** the value at the first key, only change the value if it does not exist.
 */
function preserveRoot<T extends ocxKey>(...obj: ocxObj<T>[]): ocxAcc<T> {
  const seen = new WeakMap<object, object>();

  function merge<T extends ocxKey>(acc: ocxAcc<T>, input: ocxObj<T>): ocxAcc<T> {
    if (!input) return acc;

    if (isPlainObject(input)) {
      if (seen.has(input)) return seen.get(input) as ocxAcc<T>;
      const newAcc = { ...acc };
      seen.set(input, newAcc);
      acc = newAcc;
    }

    if (Array.isArray(input)) return { ...acc, ...preserveRoot(...input) };

    if (typeof input === 'function') {
      const result = input(acc);
      return isPlainObject(result) ? merge(acc, result) : { ...acc, ...preserveRoot(result) };
    }

    if (isPlainObject(input)) {
      Reflect.ownKeys(input).forEach(key => {
        const value = (input as any)[key];
        if (acc[key as keyof T] === undefined) {
          acc[key as keyof T] = value; // Only change the value if it does not exist
        } else if (isPlainObject(value) && isPlainObject(acc[key as keyof T])) {
          acc[key as keyof T] = merge(acc[key as keyof T], value);
        }
      });
      return acc;
    }

    return acc;
  }

  return obj.reduce<ocxAcc<T>>((acc, input) => merge(acc, input), {} as ocxAcc<T>);
}

/**
 * Recursively removes falsy values from an object, except those specified in `exclude`.
 * @template T - The ocx type.
 * @param obj - The object to clean.
 * @param exclude - An array of values to be preserved even if they are falsy (default: `[]`).
 * @param seen - To detect cyclic references (default: `new WeakSet<object>()`).
 * @returns A new object without the falsy values.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/clean Docs}
 */
export function clean<T extends ocxKey>(obj: T, exclude: unknown[] = [], seen: WeakSet<object> = new WeakSet<object>()): T {
  const excludeSet = new Set(exclude);

  if (seen.has(obj)) return obj; // Avoid infinite loops
  seen.add(obj); // Mark object as visited

  return Reflect.ownKeys(obj).reduce<T>((acc, key) => {
    const value = (obj as any)[key];

    if (isPlainObject(value)) {
      const cleanedObject = clean(value, exclude, seen); // Clean objects recursively
      // Ensure the object is not empty before inserting
      if (Object.keys(cleanedObject).length > 0 || typeof key === 'symbol') (acc as any)[key] = cleanedObject;
    } else if (Array.isArray(value)) {
      // Clear every element in the array, remove empty objects
      const cleanedArray = value.map(item => (isPlainObject(item) ? clean(item, exclude, seen) : item)).filter(item => (item && !(isPlainObject(item) && Object.keys(item).length === 0)) || excludeSet.has(item));

      if (cleanedArray.length > 0) (acc as any)[key] = cleanedArray;
    } else if (value || excludeSet.has(value) || typeof key === 'symbol') {
      // Save the value if it is not falsy or belongs to `excludeSet`
      (acc as any)[key] = value;
    }

    return acc;
  }, {} as T);
}

interface ocxFunction {
  /**
   * Merges multiple objects and removes falsy values by default.
   * @template T - The base object type.
   * @param obj - One or more objects to merge.
   * @returns The deeply merged object with falsy values removed.
   */
  <T extends ocxKey>(...obj: ocxObj<T>[]): ocxAcc<T>;
  /** A version of `object` that performs deep merging **without** removing falsy values. */
  raw: typeof baseOcx;
  /** A version of `object` that performs a deep join **without overwriting** the value at the first key, only change the value if it does not exist. */
  preserve: typeof preserveRoot;
}

/**
 * Recursively merge objects with support for arrays, dynamic functions, and non falsy properties into a single object.
 *
 * Provides a chaining:
 * - {@link baseOcx raw} method to **get falsy values** from the result.
 * - {@link preserveRoot preserve} method to join **without overwriting** first value.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/?id=ocx Docs}
 */
const object: ocxFunction = (...obj) => clean(baseOcx(...obj), [0]);

object.raw = baseOcx as typeof baseOcx;
object.preserve = preserveRoot as typeof preserveRoot;

/** Recursively merge objects with support for arrays, dynamic functions, and non falsy properties into a single object. */
function ocx<T extends ocxKey>(...obj: ocxObj<T>[]): ocxAcc<T> {
  return clean(baseOcx(...obj), [0]);
}

export { ocx, object };
