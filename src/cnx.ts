/** Represents a mapping of string or symbol keys to any value. */
type keyMap = Record<string | symbol, any>;
type Primitive = string | number | boolean | symbol | bigint | null | undefined;
/** Defines the accepted value types for the utility functions. */
type cnxValues = keyMap | keyMap[] | Primitive | Primitive[] | BigInt | Date | Map<any, any> | Set<any> | cnxValues[];

/**
 * Serializes a given value into a space-separated string.
 * @param v - The value to be processed.
 * @returns A space-separated string representation of the value.
 */
function sr(v: cnxValues, sp: string = ' '): string {
  let y,
    i = 0,
    s = '';
  switch (typeof v) {
    case 'string':
    case 'number':
    case 'bigint':
      s += v;
      break;

    case 'object':
      if (Array.isArray(v)) {
        for (; i < v.length; i++) {
          if (v[i]) {
            if ((y = sr(v[i], sp))) {
              s && (s += sp);
              s += y;
            }
          }
        }
      } else {
        for (y in v) {
          if ((v as keyMap)[y]) {
            s && (s += sp);
            s += y;
          }
        }
      }
      break;

    case 'function':
      s += sr((v as Function)(s), sp);
      break;
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
    const v = args[i];
    const x = v && sr(v);
    if (x) {
      if (s) s += ' ';
      s += x;
    }
  }
  return s;
}

export { cnx };
export type { Primitive, cnxValues, keyMap };
