/** Represents a mapping of string or symbol keys to any value. */
export type keyMap = Record<string | symbol, any>;
/** Defines the accepted value types for the utility functions. */
export type cnxValues = keyMap | keyMap[] | Primitive | Primitive[] | BigInt | Date | Map<any, any> | Set<any> | cnxValues[];
export type Primitive = string | number | boolean | symbol | bigint | null | undefined;
export type cnxStateValues<T = any> = (v: T) => cnxValues;
export type cnxStrings = cnxValues | TemplateStringsArray;
export type cnxSeparator = string | number | boolean | null | undefined;

/**
 * Serializes a given value into a space-separated string.
 * @param v - The value to be processed.
 * @returns A space-separated string representation of the value.
 */
function sv(v: cnxValues, sp: string = ' '): string {
  let y,
    k = 0,
    s = '';

  if (v === null) s += v;
  switch (typeof v) {
    case 'string':
    case 'number':
    case 'bigint':
      s += v;
      break;

    case 'object':
      if (Array.isArray(v)) {
        for (; k < v.length; k++) {
          if (v[k]) {
            if ((y = sv(v[k], sp))) {
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
      s += sv((v as Function)(s), sp);
      break;
  }

  return s;
}

/**
 * Recursively serializes objects into a key-value string format.
 * @param v - The value to be processed.
 * @returns A string representation of the object.
 */
function rv(v: cnxValues, sp: string = ' '): string {
  let y,
    k = 0,
    s = '';
  if (typeof v === 'object' && v !== null) {
    if (Array.isArray(v)) {
      for (; k < v.length; k++) {
        if (v[k]) {
          if ((y = rv(v[k], sp))) {
            s && (s += sp);
            s += y;
          }
        }
      }
    } else {
      for (y in v) {
        if ((v as keyMap)[y]) {
          s && (s += sp);
          s += typeof (v as keyMap)[y] === 'object' ? `${y}.${rv((v as keyMap)[y], `${sp}${y}.`)}` : `${y}: ${(v as keyMap)[y]}`;
        }
      }
      for (const sym of Object.getOwnPropertySymbols(v)) {
        if ((v as keyMap)[sym]) {
          s && (s += sp);
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
function iv(v: cnxValues, sp: string = ' '): string {
  let y,
    k = 0,
    s = '';
  if (v instanceof Date) {
    s += v.toISOString();
  } else if (v instanceof Map) {
    for (const [q, u] of v.entries()) {
      if (u) {
        s && (s += sp);
        s += `${q}: ${u}`;
      }
    }
  } else if (v instanceof Set) {
    v.forEach(e => {
      if (e) {
        s && (s += sp);
        s += e;
      }
    });
  } else if (typeof v === 'object') {
    if (Array.isArray(v)) {
      for (; k < v.length; k++) {
        if (v[k]) {
          if ((y = iv(v[k], sp))) {
            s && (s += sp);
            s += y;
          }
        }
      }
    }
  } else if (typeof v === 'function') {
    s += iv((v as Function)(s), sp);
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

/** Handle tagged template */
function raw(strings: cnxStrings, ...values: cnxValues[]): string {
  let s = '';
  if (!(Array.isArray(strings) && 'raw' in strings)) return s;
  for (let i = 0; i < strings.length; i++) {
    s += strings[i];
    if (i < values.length) {
      const val = sv(values[i]);
      if (val) s += val;
    }
  }
  return s;
}

function spt(i: Primitive): string {
  if (i === null) return '';
  switch (typeof i) {
    case 'string':
      return i;
    case 'number':
      return i <= 0 ? '' : ' ';
    case 'boolean':
      return i ? ' ' : '';
    default:
      return ' ';
  }
}

function trim(input: cnxValues, separator: cnxSeparator = ' '): string {
  const sp = spt(separator);
  return cnx(input).replace(/\s+/g, sp);
}

cnx.raw = raw as typeof raw;
cnx.trim = trim as typeof trim;
cnx.serialize = sv as typeof sv;
cnx.recursive = rv as typeof rv;
cnx.instance = iv as typeof iv;
cnx.separator = spt as typeof spt;

export { cnx, trim };
