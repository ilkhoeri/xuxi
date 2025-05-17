import { cnx } from './cnx.ts';

/** Keys to exclude from variant configurations. Currently includes `'defaultVariants'` and `''`. */
type ExcludeKeys = 'defaultVariants' | '';
/** Utility type to exclude `undefined` from a given type `T`. */
type Undefined<T> = T extends undefined ? never : T;

/**
 * Extracts the properties of the first argument of a given function type `T`, excluding `ExcludeKeys`.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/cvx#cvxvariants Docs}
 */
export type cvxVariants<T extends (...keys: any) => any> = Omit<Undefined<Parameters<T>[0]>, ExcludeKeys>;

/** Describes a structure for variant configurations, where each key maps to a set of possible string values. */
export type cvxKeys = { [key: string]: { [key: string]: string } };

/** Casts string keys to primitive values if they match known literals. */
export type cvxPrimitiveCast<T extends string> = T extends 'true' ? true : T extends 'false' ? false : T extends 'null' ? null : T extends 'undefined' ? undefined : T extends 'Infinity' ? typeof Infinity : T extends 'NaN' ? typeof NaN : T extends `${infer N extends number}` ? N : T;

/** Variant result type that infers primitive equivalents from string keys. */
export type cvxResult<T extends cvxKeys> = { [K in keyof T]?: cvxPrimitiveCast<keyof T[K] & string> };

/**
 * Configuration object for defining variants and their options.
 * @property `string` `[assign]` - An optional base class name to prepend to the generated string.
 * @property `T` variants - Defines the variant keys and their possible values.
 * @property `cvxResult<T>` `[defaultVariants]` - Optional default variant mappings.
 */
export interface cvxRecord<T extends cvxKeys> {
  assign?: string;
  variants: T;
  defaultVariants?: cvxResult<T>;
}

/**
 * A utility function for managing values based on variant configurations.
 *
 * @template T - The type of variant keys and their possible values.
 * @param {cvxRecord<T>} keys - The configuration object containing:
 *   - `assign` (optional): A base value to always include.
 *   - `variants`: An object defining variant keys and their possible values as classes.
 *   - `defaultVariants` (optional): Default variant values for each variant key.
 * @returns {(variants?: cvxResult<T>) => string} - A function that takes a `variants` object to override default variants
 * and generates a class name string.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/cvx Docs}
 */
function cvx<T extends cvxKeys>(keys: cvxRecord<T>): (variants?: cvxResult<T>) => string {
  return (variants: cvxResult<T> = {}) => {
    const merged = { ...keys.defaultVariants, ...variants } as cvxResult<T>;
    const vars = Object.keys(keys.variants).map(key => {
      const input = merged[key as keyof T];
      const inputStr = String(input);
      const variantOptions = keys.variants[key as keyof T];
      const variantKey = inputStr in variantOptions ? inputStr : (input as keyof T[keyof T]);
      return variantKey ? variantOptions[variantKey] : undefined;
    });

    return cnx(keys.assign, vars);
  };
}

export { cvx };
