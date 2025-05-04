// @ts-ignore TS6133
import { describe, test, expect, it } from '@jest/globals';

import { cvx } from '../src'; // Named export
import x from '../src/index'; // Default export alias
import * as xuxi from '../src/index'; // Test for namespace imports

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
    expect(xuxi).toHaveProperty('variant');
    expect(xuxi.cvx).toBe(cvx);
  });

  test('should include the default export alias in the namespace export', () => {
    expect(xuxi).toHaveProperty('default');
    expect(xuxi.cvx).toBe(cvx);
  });
});
