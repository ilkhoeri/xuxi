// @ts-ignore TS6133
import { expect } from 'https://deno.land/x/expect@v0.2.6/mod.ts';
const test = Deno.test;

import { string } from '../lib/string.ts'; // Named export
import * as x from '../lib/index.ts'; // Test for namespace imports

test('should return an empty string when inputs are null or undefined', () => {
  expect(string(null, NaN, undefined)).toBe('');
});

test('should ignore boolean values', () => {
  expect(string(true, false)).toBe('');
});

test('should handle unsupported types gracefully', () => {
  expect(string(() => Symbol('test'))).toBe('');
});

test('should combine valid and invalid values correctly', () => {
  expect(string('valid', null, 42, false)).toBe('valid 42');
});

test('string handles falsy values correctly', () => {
  expect(string(null, NaN, undefined)).toEqual('');
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

test('string handles falsy values correctly', () => {
  expect(string(null, undefined, false)).toBe('');
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
  const input = () => 'classFromFunction';
  expect(string(input)).toBe('classFromFunction');
});

test('should handle nested functions', () => {
  const input = () => () => 'nestedClass';
  expect(string(input)).toBe('nestedClass');
});

test('should handle complex nested inputs', () => {
  const complexInput = ['class1', { class2: true, class3: false }, ['class4', { class5: true }], () => 'class6', () => ({ class7: true })];
  expect(string(complexInput)).toBe('class1 class2 class4 class5 class6 class7');
});

test('should return an empty string if no valid inputs are provided', () => {
  expect(string(null, undefined, false, '')).toBe('');
});

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
  expect(x).toHaveProperty('string');
  expect(x.string).toBe(string);
});

test('should include the default export alias in the namespace export', () => {
  expect(x).toHaveProperty('default');
  expect(x.string).toBe(string);
});
