// @ts-ignore TS6133
import { describe, test, expect, it } from '@jest/globals';

import { cvx } from '../src'; // Named export
import x from '../src/index'; // Default export alias
import * as xuxi from '../src/index'; // Test for namespace imports

type Equal<Left, Right> = (<T>() => T extends Left ? 1 : 2) extends <T>() => T extends Right ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

describe('variant', () => {
  it('should use defaultVariants if result does not include key', () => {
    const fn = cvx({
      assign: 'base-class',
      variants: {
        color: { primary: 'text-blue', secondary: 'text-green' },
        size: { large: 'text-lg', small: 'text-sm' }
      },
      defaultVariants: {
        color: 'primary'
      }
    });
    expect(fn()).toBe('base-class text-blue');
  });

  it('should merge result with defaultVariants', () => {
    const fn = cvx({
      assign: 'base-class',
      variants: {
        color: { primary: 'text-blue', secondary: 'text-green' },
        size: { large: 'text-lg', small: 'text-sm' }
      },
      defaultVariants: {
        color: 'primary'
      }
    });
    expect(fn({ size: 'large' })).toBe('base-class text-blue text-lg');
  });

  it('should prioritize result over defaultVariants', () => {
    const fn = cvx({
      assign: 'base-class',
      variants: {
        color: { primary: 'text-blue', secondary: 'text-green' },
        size: { large: 'text-lg', small: 'text-sm' }
      },
      defaultVariants: {
        color: 'primary'
      }
    });
    expect(fn({ color: 'secondary', size: 'small' })).toBe('base-class text-green text-sm');
  });

  it('should handle missing defaultVariants gracefully', () => {
    const keysWithoutDefaults = {
      assign: 'base-class',
      variants: {
        color: { primary: 'text-blue', secondary: 'text-green' },
        size: { large: 'text-lg', small: 'text-sm' }
      }
    };
    const fnWithoutDefaults = cvx(keysWithoutDefaults);
    expect(fnWithoutDefaults({ size: 'small' })).toBe('base-class text-sm');
  });
});

describe('variant function', () => {
  const variants = {
    size: { small: 'text-sm', large: 'text-lg' },
    color: { primary: 'text-primary', secondary: 'text-secondary' }
  };

  const defaultVariants: x.cvxResult<typeof variants> = { size: 'small', color: 'primary' };

  test('should return default variants when no input is provided', () => {
    const variantFn = cvx({ variants, defaultVariants });
    expect(variantFn()).toBe('text-sm text-primary');
  });

  test('should override default variants with provided result', () => {
    const variantFn = cvx({ variants, defaultVariants });
    const result = variantFn({ size: 'large', color: 'secondary' });
    expect(result).toBe('text-lg text-secondary');
  });

  test('should handle partial overrides of default variants', () => {
    const variantFn = cvx({ variants, defaultVariants });
    const result = variantFn({ size: 'large' });
    expect(result).toBe('text-lg text-primary');
  });

  test('should handle additional assignment string', () => {
    const variantFn = cvx({ variants, defaultVariants, assign: 'base-class' });
    expect(variantFn()).toBe('base-class text-sm text-primary');
  });

  test('should return empty string if no defaultVariants or result is provided', () => {
    const variantFn = cvx({ variants });
    expect(variantFn()).toBe('');
  });

  test('should correctly combine assignment string and overrides', () => {
    const variantFn = cvx({ variants, defaultVariants, assign: 'base-class' });
    const result = variantFn({ size: 'large' });
    expect(result).toBe('base-class text-lg text-primary');
  });

  test('should ignore unknown keys in the result', () => {
    const variantFn = cvx({ variants, defaultVariants });
    // @ts-ignore: Simulate invalid input
    const result = variantFn({ unknown: 'value' });
    expect(result).toBe('text-sm text-primary');
  });

  test('should handle variants with no defaultVariants', () => {
    const variantFn = cvx({ variants, assign: 'base-class' });
    const result = variantFn({ size: 'large', color: 'secondary' });
    expect(result).toBe('base-class text-lg text-secondary');
  });

  test('should handle empty variants object gracefully', () => {
    const variantFn = cvx({ variants: {}, assign: 'base-class' });
    expect(variantFn()).toBe('base-class');
  });

  test('should return only assignment string if no variants or result is provided', () => {
    const variantFn = cvx({ variants: {}, assign: 'base-class' });
    const result = variantFn({}); // Empty result
    expect(result).toBe('base-class');
  });
});

describe('dynamic variant values', () => {
  const stylesFont = cvx({
    variants: {
      size: {
        small: { fontSize: 14, lineHeight: 20, fontWeight: 500 },
        smallBold: { fontSize: 14, lineHeight: 20, fontWeight: 700 },
        default: { fontSize: 16, lineHeight: 24, fontWeight: 500 }
      }
    }
  });

  const stylesNative = cvx({
    variants: {
      variant: {
        'text-small': { fontSize: 14, lineHeight: 20, fontWeight: 500 },
        'with-transform': { fontSize: 14, lineHeight: 20, fontWeight: 700, transform: '', transformOrigin: '' }
      }
    }
  });

  const variantDinamis = cvx({
    variants: {
      size: {
        small: 'small',
        smallBold: { fontSize: 14, lineHeight: 20, fontWeight: 700 },
        default: ['1', '2', '3']
      }
    }
  });

  cvx({
    variants: {
      // @ts-expect-error Array variant values must contain strings only.
      invalid: { value: ['valid', 2] }
    }
  });

  test('should preserve native values at runtime', () => {
    expect(stylesFont({ size: 'smallBold' })).toEqual({ fontSize: 14, lineHeight: 20, fontWeight: 700 });
    expect(stylesNative({ variant: 'with-transform' })).toEqual({
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 700,
      transform: '',
      transformOrigin: ''
    });
    expect(variantDinamis({ size: 'default' })).toEqual(['1', '2', '3']);
  });

  test('should infer the union of configured return values', () => {
    type Font = { fontSize: number; lineHeight: number; fontWeight: number };
    type Native = Font | { fontSize: number; lineHeight: number; fontWeight: number; transform: string; transformOrigin: string };
    type Dynamic = string | Font | string[];

    const fontType: Expect<ReturnType<typeof stylesFont> extends Font ? (Font extends ReturnType<typeof stylesFont> ? true : false) : false> = true;
    const nativeType: Expect<Equal<ReturnType<typeof stylesNative>, Native>> = true;
    const dynamicType: Expect<Equal<ReturnType<typeof variantDinamis>, Dynamic>> = true;

    expect(fontType && nativeType && dynamicType).toBe(true);
  });
});

describe('dynamic assignments', () => {
  const fontSizeVariant = cvx({
    assign: { textDecoration: 'underline', fontSize: 14, lineHeight: 90 },
    variants: {
      size: {
        small: { fontSize: 14, lineHeight: 20, fontWeight: 500 },
        default: { fontSize: 16, lineHeight: 24, fontWeight: 500 }
      }
    }
  });

  const dynamicVariant = cvx({
    assign: ['100'],
    variants: {
      size: {
        value: ['200'],
        small: 'small',
        practice: 'practice',
        default: [1, 7, 9]
      },
      fontSize: {
        all: ['300', '400', '500', '600', '700'],
        thin: '300',
        normal: '400',
        medium: '600',
        semibold: '700'
      }
    },
    defaultVariants: { size: 'small', fontSize: 'medium' }
  });

  test('should merge object assignments and let variants overwrite matching keys', () => {
    expect(fontSizeVariant({ size: 'default' })).toEqual({
      textDecoration: 'underline',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 500
    });
  });

  test('should merge only arrays with the same item type as assign', () => {
    expect(dynamicVariant({ size: 'default', fontSize: 'all' })).toEqual(['100', '300', '400', '500', '600', '700']);
    expect(dynamicVariant({ size: 'value', fontSize: 'thin' })).toEqual(['100', '200']);
  });

  test('should preserve the assignment type as the return type', () => {
    type FontStyle = { textDecoration: string; fontSize: number; lineHeight: number; fontWeight: number };
    const objectType: Expect<ReturnType<typeof fontSizeVariant> extends FontStyle ? true : false> = true;
    const arrayType: Expect<Equal<ReturnType<typeof dynamicVariant>, string[]>> = true;

    expect(objectType && arrayType).toBe(true);
  });
});

describe('export validation', () => {
  test('should correctly export variant as a named export', () => {
    expect(cvx).toBeDefined();
    expect(typeof cvx).toBe('function');
  });

  test('should correctly export variant as the default export (alias x)', () => {
    expect(x.cvx).toBeDefined();
    expect(typeof x.cvx).toBe('function');
    expect(x.cvx).toBe(cvx); // Ensure both exports point to the same function
  });

  test('should include variant in the namespace export', () => {
    expect(xuxi).toHaveProperty('cvx');
    expect(xuxi.cvx).toBe(cvx);
  });

  test('should include the default export alias in the namespace export', () => {
    expect(xuxi).toHaveProperty('default');
    expect(xuxi.cvx).toBe(cvx);
  });
});
