/** Represents a mapping of string or symbol keys to any value. */
export type keyMap = Record<string | symbol, any>;

/** Defines the accepted value types for the utility functions. */
export type cnxValues = keyMap | keyMap[] | cnxValues[] | string | number | boolean | null | undefined | BigInt | Date | Map<any, any> | Set<any> | ((v?: any) => cnxValues);

/**
 * Serializes a given value into a space-separated string.
 * @param v - The value to be processed.
 * @returns A space-separated string representation of the value.
 */
function sv(v: cnxValues): string {
  let k = 0,
    y,
    s = '';
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'bigint' || v === null) {
    s += v;
  } else if (typeof v === 'object') {
    if (Array.isArray(v)) {
      for (; k < v.length; k++) {
        if (v[k]) {
          if ((y = sv(v[k]))) {
            s && (s += ' ');
            s += y;
          }
        }
      }
    } else {
      for (y in v) {
        if ((v as keyMap)[y]) {
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
function rv(v: cnxValues, separator: string = ' '): string {
  let k = 0,
    y,
    s = '';
  if (typeof v === 'object' && v !== null) {
    if (Array.isArray(v)) {
      for (; k < v.length; k++) {
        if (v[k]) {
          if ((y = rv(v[k]))) {
            s && (s += separator);
            s += y;
          }
        }
      }
    } else {
      for (y in v) {
        if ((v as keyMap)[y]) {
          s && (s += separator);
          s += `${y}: ${typeof (v as keyMap)[y] === 'object' ? rv((v as keyMap)[y]) : (v as keyMap)[y]}`;
        }
      }
      for (const sym of Object.getOwnPropertySymbols(v)) {
        if ((v as keyMap)[sym]) {
          s && (s += separator);
          s += `${String(sym)}: ${(v as keyMap)[sym]}`;
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
function iv(v: cnxValues, separator: string = ' '): string {
  let k = 0,
    y,
    s = '';
  if (v instanceof Date) {
    s += v.toISOString();
  } else if (v instanceof Map) {
    for (const [q, u] of v.entries()) {
      if (u) {
        s && (s += separator);
        s += `${q}: ${u}`;
      }
    }
  } else if (v instanceof Set) {
    v.forEach(e => {
      if (e) {
        s && (s += separator);
        s += e;
      }
    });
  } else if (typeof v === 'object') {
    if (Array.isArray(v)) {
      for (; k < v.length; k++) {
        if (v[k]) {
          if ((y = iv(v[k]))) {
            s && (s += separator);
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

/**
 * Converts input values into a space-separated string.
 * @param args - Input values.
 * @returns The formatted string.
 */
function cnx(...args: cnxValues[]): string {
  let s = '';
  for (let i = 0; i < args.length; i++) {
    const t = args[i];
    const x = t && sv(t);
    if (x) {
      if (s) s += ' ';
      s += x;
    }
  }
  return s;
}

type StringValues = cnxValues;
/**
 * Represents a string utility object returned by the `string()` function.
 *
 * Provides multiple methods for converting the original values
 * into different string formats.
 */
interface StringFunction {
  /** Converts input values into a space-separated string. Similar to how class names are joined in CSS-in-JS libraries. */
  toString(): string;
  /** Recursively serializes objects, arrays, and nested structures into a flattened key=value pair string. */
  recursive(): string;
  /** Detects specific object types like Date, Map, and Set, and converts them into human-readable strings. */
  instanceof(): string;
  /** Implicitly converts the object to a string when used in a primitive context (e.g., template literals). */
  [Symbol.toPrimitive](): string;
}
/**
 * Creates a string utility object from the given input values.
 *
 * Accepts a list of values (strings, objects, arrays, or primitives) and provides
 * multiple methods to serialize or convert them into string representations
 * based on different strategies.
 *
 * This is especially useful for conditionally building class names, query strings,
 * or logging structured data.
 *
 * @param args - One or more values to be stringified or serialized.
 * @returns An object with string conversion utilities.
 */
function string(...args: StringValues[]): StringFunction {
  return {
    toString() {
      return cnx(...args);
    },
    recursive() {
      return rv(args);
    },
    instanceof() {
      return iv(args);
    },
    [Symbol.toPrimitive]() {
      return cnx(...args);
    }
  };
}

export { cnx, string, rv as recursive, iv as instanceof };
