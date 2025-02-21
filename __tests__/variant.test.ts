// @ts-ignore TS6133
import { describe, test, expect, it } from '@jest/globals';

import { variant } from '../src'; // Named export
import x from '../src/index'; // Default export alias
import * as xuxi from '../src/index'; // Test for namespace imports

describe('variant', () => {
  it('should use defaultVariants if result does not include key', () => {
    const fn = variant({
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
    const fn = variant({
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
    const fn = variant({
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
    const fnWithoutDefaults = variant(keysWithoutDefaults);
    expect(fnWithoutDefaults({ size: 'small' })).toBe('base-class text-sm');
  });
});

describe('variant function', () => {
  const variants = {
    size: { small: 'text-sm', large: 'text-lg' },
    color: { primary: 'text-primary', secondary: 'text-secondary' }
  };

  const defaultVariants: x.VariantResult<typeof variants> = { size: 'small', color: 'primary' };

  test('should return default variants when no input is provided', () => {
    const variantFn = variant({ variants, defaultVariants });
    expect(variantFn()).toBe('text-sm text-primary');
  });

  test('should override default variants with provided result', () => {
    const variantFn = variant({ variants, defaultVariants });
    const result = variantFn({ size: 'large', color: 'secondary' });
    expect(result).toBe('text-lg text-secondary');
  });

  test('should handle partial overrides of default variants', () => {
    const variantFn = variant({ variants, defaultVariants });
    const result = variantFn({ size: 'large' });
    expect(result).toBe('text-lg text-primary');
  });

  test('should handle additional assignment string', () => {
    const variantFn = variant({ variants, defaultVariants, assign: 'base-class' });
    expect(variantFn()).toBe('base-class text-sm text-primary');
  });

  test('should return empty string if no defaultVariants or result is provided', () => {
    const variantFn = variant({ variants });
    expect(variantFn()).toBe('');
  });

  test('should correctly combine assignment string and overrides', () => {
    const variantFn = variant({ variants, defaultVariants, assign: 'base-class' });
    const result = variantFn({ size: 'large' });
    expect(result).toBe('base-class text-lg text-primary');
  });

  test('should ignore unknown keys in the result', () => {
    const variantFn = variant({ variants, defaultVariants });
    // @ts-ignore: Simulate invalid input
    const result = variantFn({ unknown: 'value' });
    expect(result).toBe('text-sm text-primary');
  });

  test('should handle variants with no defaultVariants', () => {
    const variantFn = variant({ variants, assign: 'base-class' });
    const result = variantFn({ size: 'large', color: 'secondary' });
    expect(result).toBe('base-class text-lg text-secondary');
  });

  test('should handle empty variants object gracefully', () => {
    const variantFn = variant({ variants: {}, assign: 'base-class' });
    expect(variantFn()).toBe('base-class');
  });

  test('should return only assignment string if no variants or result is provided', () => {
    const variantFn = variant({ variants: {}, assign: 'base-class' });
    const result = variantFn({}); // Empty result
    expect(result).toBe('base-class');
  });
});

describe('export validation', () => {
  test('should correctly export variant as a named export', () => {
    expect(variant).toBeDefined();
    expect(typeof variant).toBe('function');
  });

  test('should correctly export variant as the default export (alias x)', () => {
    expect(x.variant).toBeDefined();
    expect(typeof x.variant).toBe('function');
    expect(x.variant).toBe(variant); // Ensure both exports point to the same function
  });

  test('should include variant in the namespace export', () => {
    expect(xuxi).toHaveProperty('variant');
    expect(xuxi.variant).toBe(variant);
  });

  test('should include the default export alias in the namespace export', () => {
    expect(xuxi).toHaveProperty('default');
    expect(xuxi.variant).toBe(variant);
  });
});
