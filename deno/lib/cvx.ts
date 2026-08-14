/** Keys to exclude from variant configurations. Currently includes `'defaultVariants'` and `''`. */
type ExcludeKeys = 'defaultVariants' | '';
/** Utility type to exclude `undefined` from a given type `T`. */
type Undefined<T> = T extends undefined ? never : T;
/**
 * Extracts the properties of the first argument of a given function type `T`, excluding `ExcludeKeys`.
 * @example
 * @docs {@link https://ilkhoeri.github.io/xuxi/cvx#cvxvariants Docs}
 */
type cvxVariants<T extends (...keys: any) => any> = Omit<Undefined<Parameters<T>[0]>, ExcludeKeys>;
/**
 * Extracts the value of a variant from the first argument based on the key value.
 * @example
 * @docs {@link https://ilkhoeri.github.io/xuxi/cvx#cvxvariant Docs}
 */
type cvxVariant<T extends (...keys: any) => any, K extends keyof cvxVariants<T>> = NonNullable<cvxVariants<T>[K]>;
/** A value that can be returned by a variant. Arrays contain only strings or only numbers. */
type cvxValue = string | string[] | number | number[] | Record<string, unknown>;
/** A value that can be used as a base assignment. */
type cvxAssign = string | string[] | number[] | Record<string, unknown>;
/** Describes a structure for variant configurations and their possible return values. */
type cvxKeys = { [key: string]: { [key: string]: cvxValue } };
/** Casts string keys to primitive values if they match known literals. */
type cvxPrimitiveCast<T extends string> = T extends 'true' ? boolean : T extends 'false' ? boolean : T extends 'null' ? null : T extends 'undefined' ? undefined : T extends 'Infinity' ? typeof Infinity : T extends 'NaN' ? typeof NaN : T extends `${infer N extends number}` ? N : T;
/** Utility type to remove index signatures */
type RemoveIndexSignature<T> = { [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K] };
/** Variant result type that infers primitive equivalents from string keys.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/cvx#cvx-types https://ilkhoeri.github.io/xuxi/cvx#cvx-types}
 */
type cvxResult<T extends cvxKeys> = { [K in keyof RemoveIndexSignature<T>]?: cvxPrimitiveCast<keyof T[K] & string> };
/** Widens primitive literals and string tuples while retaining object shapes. */
type cvxWiden<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends string[] ? string[] : T extends Record<string, unknown> ? { [K in keyof T]: cvxWiden<T[K]> } : T;
/** The value returned by a configured variant. */
type cvxReturn<T extends cvxKeys> = cvxWiden<{ [K in keyof T]: T[K][keyof T[K]] }[keyof T]>;
/** The value returned when a base assignment is configured. */
type cvxAssignedReturn<T extends cvxKeys, A extends cvxAssign> = A extends Record<string, unknown> ? ([Extract<cvxReturn<T>, Record<string, unknown>>] extends [never] ? cvxWiden<A> : cvxWiden<A> & Extract<cvxReturn<T>, Record<string, unknown>>) : cvxWiden<A>;
/**
 * Configuration object for defining variants and their options.
 * @property `string` `[assign]` - An optional base class name to prepend to the generated string.
 * @property `T` variants - Defines the variant keys and their possible values.
 * @property `cvxResult<T>` `[defaultVariants]` - Optional default variant mappings.
 */
interface cvxRecord<T extends cvxKeys> {
  variants: T;
  defaultVariants?: cvxResult<T>;
}
interface cvxAssignedRecord<T extends cvxKeys, A extends cvxAssign | undefined = undefined> {
  /**
   * assign sekarang mendukung `string`, `string[]`, `number[]`, dan `object`.
   * - `Object`: assign digabung dengan object variant; nilai variant menimpa key yang sama.
   * - `Array`: assign hanya digabung dengan array variant yang tipe elemennya sama (`string[]` dengan `string[]`, `number[]` dengan `number[]`).
   * - `String`: assign hanya digabung dengan variant string.
   * - Jika assign tidak didefinisikan, perilaku cvx dinamis sebelumnya tetap berlaku.
   */
  assign: A;
  variants: T;
  defaultVariants?: cvxResult<T>;
}
/**
 * A utility function for managing values based on variant configurations.
 *
 * @template T - The type of variant keys and their possible values.
 * @param {cvxRecord<T>} keys - The configuration object containing:
 * - `assign` (optional): A base value to always include.
 * - `variants`: An object defining variant keys and their possible values as classes.
 * - `defaultVariants` (optional): Default variant values for each variant key.
 * @returns A function that takes a `variants` object to override default variants. String values are combined as class
 * names; object and string-array values are returned as their native values.
 * @example
 * @docs {@link https://ilkhoeri.github.io/xuxi/cvx https://ilkhoeri.github.io/xuxi/cvx}
 */
function cvx<T extends cvxKeys, A extends cvxAssign>(keys: cvxAssignedRecord<T, A>): (vars?: cvxResult<T>) => cvxAssignedReturn<T, A>;
function cvx<T extends cvxKeys>(keys: cvxRecord<T>): (vars?: cvxResult<T>) => cvxReturn<T>;
function cvx<T extends cvxKeys, A extends cvxAssign | undefined>(keys: cvxRecord<T> & { assign?: A }): (vars?: cvxResult<T>) => cvxReturn<T> | cvxAssignedReturn<T, Exclude<A, undefined>> {
  return (variants: cvxResult<T> = {}) => {
    const merged = { ...keys.defaultVariants, ...variants } as cvxResult<T>;
    const values = Object.keys(keys.variants).flatMap(key => {
      const input = merged[key as keyof RemoveIndexSignature<T>];
      const inputStr = String(input);
      const variantOptions = keys.variants[key as keyof T];
      const variantKey = inputStr in variantOptions ? inputStr : (input as keyof T[keyof T]);
      return variantKey ? [variantOptions[variantKey] as cvxValue] : [];
    });

    const assign = keys.assign;

    if (assign !== undefined) {
      if (typeof assign === 'string') return [assign, ...values.filter(value => typeof value === 'string')].filter(Boolean).join(' ') as cvxAssignedReturn<T, Exclude<A, undefined>>;
      if (Array.isArray(assign)) return [...assign, ...values.filter(value => Array.isArray(value) && sameArrayValueType(assign, value)).flat()] as cvxAssignedReturn<T, Exclude<A, undefined>>;
      return Object.assign({}, assign, ...values.filter(value => isObject(value))) as cvxAssignedReturn<T, Exclude<A, undefined>>;
    }

    if (values.every(value => typeof value === 'string')) return values.join(' ') as cvxReturn<T>;
    if (values.every(Array.isArray) && values.every(value => sameArrayValueType(values[0] as string[] | number[], value as string[] | number[]))) return values.flat() as cvxReturn<T>;
    if (values.every(value => typeof value === 'object' && !Array.isArray(value))) return Object.assign({}, ...values) as cvxReturn<T>;

    return values[0] as cvxReturn<T>;
  };
}

function isObject(value: cvxValue): value is Record<string, unknown> {
  return typeof value === 'object' && !Array.isArray(value);
}

function sameArrayValueType(left: string[] | number[], right: string[] | number[]): boolean {
  const leftValue = left[0];
  const rightValue = right[0];
  return leftValue === undefined || rightValue === undefined || typeof leftValue === typeof rightValue;
}
export { cvx };
export type { cvxAssign, cvxKeys, cvxPrimitiveCast, cvxRecord, cvxResult, cvxValue, cvxVariant, cvxVariants };
