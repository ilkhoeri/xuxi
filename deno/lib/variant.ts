/** @type {ExcludeKeys} - Keys to exclude from variant configurations. Currently includes `'defaultVariants'` and `''`. */
type ExcludeKeys = 'defaultVariants' | '';
/** @type {Undefined<T>} - Utility type to exclude `undefined` from a given type `T`. */
type Undefined<T> = T extends undefined ? never : T;

/**
 * @type {VariantProps<T>} - Extracts the properties of the first argument of a given function type `T`, excluding `ExcludeKeys`.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/variant#variantprops Docs}
 */
export type VariantProps<T extends (...keys: any) => any> = Omit<Undefined<Parameters<T>[0]>, ExcludeKeys>;

/**
 * @type {VariantKeys} - Describes a structure for variant configurations, where each key maps to a set of possible string values.
 */
export type VariantKeys = { [key: string]: { [key: string]: string } };

/**
 * @type {VariantResult<T>} - Represents a mapping of variant keys to one of their possible values.
 */
export type VariantResult<T extends VariantKeys> = { [K in keyof T]?: keyof T[K] };

/**
 * @interface `VariantRecord<T>` - Configuration object for defining variants and their options.
 * @property `string` `[assign]` - An optional base class name to prepend to the generated string.
 * @property `T` variants - Defines the variant keys and their possible values.
 * @property `VariantResult<T>` `[defaultVariants]` - Optional default variant mappings.
 */
export interface VariantRecord<T extends VariantKeys> {
  assign?: string;
  variants: T;
  defaultVariants?: VariantResult<T>;
}

/**
 * A utility function for managing values based on variant configurations.
 *
 * This function simplifies the handling of value generation with support for variants, default values, and dynamic overrides.
 * @template T - The type of variant keys and their possible values.
 * @param {VariantRecord<T>} keys - The configuration object containing:
 *   - `assign` (optional): A base value to always include.
 *   - `variants`: An object defining variant keys and their possible values as classes.
 *   - `defaultVariants` (optional): Default variant values for each variant key.
 * @returns {(result?: VariantResult<T>) => string} - A function that takes a `result` object to override default variants
 * and generates a class name string.
 * @example
 * @see {@link https://ilkhoeri.github.io/xuxi/variant Docs}
 */
function variant<T extends VariantKeys>(keys: VariantRecord<T>): (result?: VariantResult<T>) => string {
  return (result: VariantResult<T> = {}) => {
    const mergedVariant = { ...keys.defaultVariants, ...result } as {
      [K in keyof T]?: keyof T[K];
    };

    const variants = Object.keys(keys.variants)
      .map(key => {
        const variantKey = mergedVariant[key as keyof T] || keys.defaultVariants?.[key as keyof T];
        return variantKey ? keys.variants[key as keyof T][variantKey as keyof T[keyof T]] : undefined;
      })
      .filter(Boolean)
      .join(' ')
      .trim();

    return keys.assign ? [keys.assign, variants].join(' ').trim() : variants;
  };
}

export { variant };
