// @ts-ignore TS6133
import { describe, test, expect, it } from '@jest/globals';

import { string } from '../src'; // Named export
import x from '../src/index'; // Default export alias
import * as xuxi from '../src/index'; // Test for namespace imports

describe('string function', () => {
  it('should return an empty string when inputs are null or undefined', () => {
    expect(string(null, NaN, undefined)).toBe('');
  });

  it('should ignore boolean values', () => {
    expect(string(true, false)).toBe('');
  });

  it('should handle unsupported types gracefully', () => {
    expect(string(() => Symbol('test'))).toBe('');
  });

  it('should combine valid and invalid values correctly', () => {
    expect(string('valid', null, 42, false)).toBe('valid 42');
  });

  test('string handles falsy values correctly', () => {
    expect(string()).toEqual('');
  });

  test('string handles falsy values correctly', () => {
    expect(string({}, false, () => {}, [])).toEqual('');
  });

  test('string handles [][] values', () => {
    expect(string([], [], [])).toEqual('');
  });

  test('should concatenate string and number inputs', () => {
    expect(string('class1', 'class2', 123)).toBe('class1 class2 123');
  });

  test('should skip falsy values like null, undefined, false, and empty strings', () => {
    expect(string('class1', null, undefined, '', false, 'class2')).toBe('class1 class2');
  });

  test('should handle arrays of strings and numbers', () => {
    expect(string(['class1', 'class2', 123])).toBe('class1 class2 123');
  });

  test('should handle nested arrays', () => {
    expect(string(['class1', ['class2', ['class3', 456]], 'class4'])).toBe('class1 class2 class3 456 class4');
  });

  test('should handle objects with truthy values', () => {
    const input = { class1: true, class2: false, class3: 1, class4: null, class5: 'value' };
    expect(string(input)).toBe('class1 class3 class5');
  });

  test('should handle arrays of objects', () => {
    const input = [
      { class1: true, class2: false },
      { class3: true, class4: 0 }
    ];
    expect(string(input)).toBe('class1 class3');
  });

  test('should call functions and concatenate their results', () => {
    expect(string(() => 'classFromFunction')).toBe('classFromFunction');
  });

  test('should handle nested functions', () => {
    const input = () => () => 'nestedClass';
    expect(string(input)).toBe('nestedClass');
  });

  test('should handle Object.is equality', () => {
    expect(string('header', { sticky: true }, [null, 'shadow'], () => ['dynamic', { visible: true }])).toBe('header sticky shadow dynamic visible');
  });

  test('should handle complex nested inputs', () => {
    const complexInput = ['class1', { class2: true, class3: false }, ['class4', { class5: true }], () => 'class6', () => ({ class7: true })];
    expect(string(complexInput)).toBe('class1 class2 class4 class5 class6 class7');
  });

  test('should return an empty string if no valid inputs are provided', () => {
    expect(string(null, undefined, false, '')).toBe('');
  });
});

describe('export validation', () => {
  test('should correctly export string as a named export', () => {
    expect(string).toBeDefined();
    expect(typeof string).toBe('function');
  });

  test('should correctly export string as the default export (alias x)', () => {
    expect(x.string).toBeDefined();
    expect(typeof x.string).toBe('function');
    expect(x.string).toBe(string); // Ensure both exports point to the same function
  });

  test('should include string in the namespace export', () => {
    expect(xuxi).toHaveProperty('string');
    expect(xuxi.string).toBe(string);
  });

  test('should include the default export alias in the namespace export', () => {
    expect(xuxi).toHaveProperty('default');
    expect(xuxi.string).toBe(string);
  });
});
