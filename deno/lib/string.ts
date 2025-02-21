import { variant } from './variant.ts';

/** Represents a mapping of string or symbol keys to any value. */
export type StringKeyMap = Record<string | symbol, any>;

/** Defines the accepted value types for the utility functions. */
export type StringValues = StringKeyMap | StringKeyMap[] | StringValues[] | string | number | boolean | null | undefined | BigInt | Date | Map<any, any> | Set<any> | ((v?: any) => StringValues);

/**
 * Serializes a given value into a space-separated string.
 * @param v - The value to be processed.
 * @returns A space-separated string representation of the value.
 */
function sv(v: StringValues): string {
  let k,
    y,
    s = '';

  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'bigint' || v === null) {
    s += v;
  } else if (typeof v === 'object') {
    if (Array.isArray(v)) {
      let o = v.length;
      for (k = 0; k < o; k++) {
        if (v[k]) {
          if ((y = sv(v[k]))) {
            s && (s += ' ');
            s += y;
          }
        }
      }
    } else {
      for (y in v) {
        if ((v as StringKeyMap)[y]) {
          s && (s += ' ');
          s += y;
        }
      }
    }
  } else if (typeof v === 'function') {
    s += sv(v(s));
  }

  return s;
}

/**
 * Recursively serializes objects into a key-value string format.
 * @param v - The value to be processed.
 * @returns A string representation of the object.
 */
function rv(v: StringValues): string {
  let k,
    y,
    s = '';

  if (typeof v === 'object' && v !== null) {
    if (Array.isArray(v)) {
      let o = v.length;
      for (k = 0; k < o; k++) {
        if (v[k]) {
          if ((y = rv(v[k]))) {
            s && (s += ' ');
            s += y;
          }
        }
      }
    } else {
      for (y in v) {
        if ((v as StringKeyMap)[y]) {
          s && (s += ' ');
          s += `${y}:${typeof (v as StringKeyMap)[y] === 'object' ? rv((v as StringKeyMap)[y]) : (v as StringKeyMap)[y]}`;
        }
      }
      for (const sym of Object.getOwnPropertySymbols(v)) {
        if ((v as StringKeyMap)[sym]) {
          s && (s += ' ');
          s += `${String(sym)}:${(v as StringKeyMap)[sym]}`;
        }
      }
    }
  }

  return s;
}

/**
 * Serializes instances of Date, Map, and Set objects into a string format.
 * @param v - The value to be processed.
 * @returns A string representation of the instance.
 */
function iv(v: StringValues): string {
  let k,
    y,
    s = '';

  if (v instanceof Date) {
    s += v.toISOString();
  } else if (v instanceof Map) {
    for (const [q, u] of v.entries()) {
      if (u) {
        s && (s += ' '); // concatenation
        s += `${q}:${u}`;
      }
    }
  } else if (v instanceof Set) {
    v.forEach(e => {
      if (e) {
        s && (s += ' ');
        s += e;
      }
    });
  } else if (typeof v === 'object') {
    if (Array.isArray(v)) {
      var o = v.length;
      for (k = 0; k < o; k++) {
        if (v[k]) {
          if ((y = iv(v[k]))) {
            s && (s += ' ');
            s += y;
          }
        }
      }
    }
  } else if (typeof v === 'function') {
    s += iv(v(s));
  }

  return s;
}

/** Represents a string manipulation utility with chaining capabilities. */
export interface stringFunction {
  (...args: StringValues[]): string;
  /**
   * Applies recursive transformation to the input values.
   * @param args - Input values.
   * @returns Transformed string.
   */
  recursive: typeof recursiveFn;
  /**
   * Applies instance-based transformation to the input values.
   * @param args - Input values.
   * @returns Transformed string.
   */
  instanceof: typeof instanceofFn;
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
  variant: typeof variant;
}

/**
 * Applies recursive transformation to the input values.
 * @param args - Input values.
 * @returns Transformed string.
 */
function recursiveFn(...args: StringValues[]): string {
  return rv(args);
}

/**
 * Applies instance-based transformation to the input values.
 * @param args - Input values.
 * @returns Transformed string.
 */
function instanceofFn(...args: StringValues[]): string {
  return iv(args);
}

/**
 * Converts input values into a space-separated string.
 * @param args - Input values.
 * @returns The formatted string.
 */
const string: stringFunction = (...args: StringValues[]) => {
  let i = 0,
    t,
    x,
    s = '',
    o = args.length;
  for (; i < o; i++) {
    if ((t = args[i])) {
      if ((x = sv(t))) {
        s && (s += ' ');
        s += x;
      }
    }
  }
  return s;
};

string.recursive = recursiveFn as typeof recursiveFn;
string.instanceof = instanceofFn as typeof instanceofFn;
string.variant = variant as typeof variant;

export { string, recursiveFn as recursive, instanceofFn as instanceof };
