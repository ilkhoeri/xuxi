/**
 * Converts a value to a `rem` unit with optional scaling.
 * @param {unknown} value - The value to convert. Can be a number, string, or other types.
 * @returns {string} The converted value in `rem` units.
 */
const rem: (value: unknown) => string = createConverter('rem', { shouldScale: true });

/**
 * Converts a value to an `em` unit.
 * @param {unknown} value - The value to convert. Can be a number, string, or other types.
 * @returns {string} The converted value in `em` units.
 */
const em: (value: unknown) => string = createConverter('em');

/**
 * Converts a value to a pixel (`px`) unit or returns the original value if it cannot be converted.
 * @param {unknown} value - The value to convert. Can be a number, string, or other types.
 * @returns {string | number} The converted value in `px` units, or `NaN` if conversion fails.
 * @example
 * px(16); // 16
 * px('1rem'); // 16
 * px('calc(100% - 50px)'); // 'calc(100% - 50px)'
 */
function px(value: unknown): string | number {
  const tr = getTransformedScaledValue(value);
  if (typeof tr === 'number') {
    return tr;
  }
  if (typeof tr === 'string') {
    if (tr.includes('calc') || tr.includes('var')) {
      return tr;
    }

    const uMap: Record<string, number> = { px: 1, rem: 16, em: 16 };
    const u = Object.keys(uMap).find(unit => tr.includes(unit));

    if (u) {
      return parseFloat(tr.replace(u, '')) * uMap[u];
    }

    const num = Number(tr);
    return !isNaN(num) ? num : NaN;
  }
  return NaN;
}

/**
 * Creates a converter function for a specific unit (e.g., `rem`, `em`).
 * @param units - The target unit for conversion (e.g., `rem`, `em`).
 * @param [options] - Options for the converter.
 * @param [options.shouldScale=false] - Whether to scale the value during conversion.
 * @returns `(value: unknown) => string` - A function that converts a value to the specified unit.
 * @example
 * const remConverter = createConverter('rem', { shouldScale: true });
 * remConverter(16); // '1rem'
 */
function createConverter(units: string, { shouldScale = false } = {}): (value: unknown) => string {
  function converter(value: unknown): string {
    if (value === 0 || value === '0') return `0${units}`;
    if (typeof value === 'number') {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === 'string') {
      if (value === '') return value;
      if (value.startsWith('calc(') || value.startsWith('clamp(') || value.includes('rgba(')) {
        return value;
      }
      if (value.includes(',')) {
        return value
          .split(',')
          .map(val => converter(val))
          .join(',');
      }
      if (value.includes(' ')) {
        return value
          .split(' ')
          .map(val => converter(val))
          .join(' ');
      }
      if (value.includes(units)) return shouldScale ? scaleRem(value) : value;

      const replaced = value.replace('px', '');
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value as string;
  }
  return converter;
}

/**
 * Scales a `rem` value if scaling is enabled.
 * @param {string} value - The `rem` value to scale.
 * @returns {string} - The scaled `rem` value.
 * @example
 * scaleRem('1rem'); // '1rem'
 */
function scaleRem(value: string): string {
  if (value === '0rem') return '0rem';
  return value;
}

/**
 * Processes and extracts scaled values from `calc()` or `var()` strings.
 * @param {unknown} value - The value to transform.
 * @returns {unknown} - The transformed value or the original value if no transformation is applied.
 * @example
 * getTransformedScaledValue('calc(1 * var(--scale))'); // '1'
 */
function getTransformedScaledValue(value: unknown): unknown {
  if (typeof value !== 'string' || !/var\(--.*?scale\)/.test(value)) {
    return value;
  }

  return value
    ?.match(/^calc\((.*?)\)$/)?.[1]
    ?.split('*')[0]
    ?.trim();
}

export { createConverter, px, rem, em };
