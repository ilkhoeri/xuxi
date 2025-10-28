// @ts-ignore TS6133
import { expect } from 'https://deno.land/x/expect@v0.2.6/mod.ts';
const test = Deno.test;

import { cnx, Cnx, trim } from '../lib/cnx.ts'; // Named export
import * as x from '../lib/index.ts'; // Test for namespace imports

test('should return an empty string when inputs are null or undefined', () => {
  expect(cnx(null, NaN, undefined)).toBe('');
});

test('should ignore boolean values', () => {
  expect(cnx(true, false)).toBe('');
});

test('should handle unsupported types gracefully', () => {
  expect(cnx(() => Symbol('test'))).toBe('');
});

test('should combine valid and invalid values correctly', () => {
  expect(cnx('valid', null, 42, false)).toBe('valid 42');
});

test('string handles falsy values correctly', () => {
  expect(cnx(null, NaN, undefined)).toEqual('');
});

test('string handles falsy values correctly', () => {
  expect(cnx()).toEqual('');
});

test('string handles falsy values correctly', () => {
  expect(cnx({}, false, () => {}, [])).toEqual('');
});

test('string handles [][] values', () => {
  expect(cnx([], [], [])).toEqual('');
});

test('string handles falsy values correctly', () => {
  expect(cnx(null, undefined, false)).toBe('');
});

test('should concatenate string and number inputs', () => {
  expect(cnx('class1', 'class2', 123)).toBe('class1 class2 123');
});

test('should skip falsy values like null, undefined, false, and empty strings', () => {
  expect(cnx('class1', null, undefined, '', false, 'class2')).toBe('class1 class2');
});

test('should handle arrays of strings and numbers', () => {
  expect(cnx(['class1', 'class2', 123])).toBe('class1 class2 123');
});

test('should handle nested arrays', () => {
  expect(cnx(['class1', ['class2', ['class3', 456]], 'class4'])).toBe('class1 class2 class3 456 class4');
});

test('should handle objects with truthy values', () => {
  const input = { class1: true, class2: false, class3: 1, class4: null, class5: 'value' };
  expect(cnx(input)).toBe('class1 class3 class5');
});

test('should handle arrays of objects', () => {
  const input = [
    { class1: true, class2: false },
    { class3: true, class4: 0 }
  ];
  expect(cnx(input)).toBe('class1 class3');
});

test('should call functions and concatenate their results', () => {
  const input = () => 'classFromFunction';
  expect(cnx(input)).toBe('classFromFunction');
});

test('should handle nested functions', () => {
  const input = () => () => 'nestedClass';
  expect(cnx(input)).toBe('nestedClass');
});

test('should handle complex nested inputs', () => {
  const complexInput = ['class1', { class2: true, class3: false }, ['class4', { class5: true }], () => 'class6', () => ({ class7: true })];
  expect(cnx(complexInput)).toBe('class1 class2 class4 class5 class6 class7');
});

test('should return an empty string if no valid inputs are provided', () => {
  expect(cnx(null, undefined, false, '')).toBe('');
});

// test('should handle tagged template mode', () => {
//   const item = 'apples';
//   const quantity = 5;
//   expect(Cnx.raw`We have ${quantity} ${item}.`).toBe('We have 5 apples.');
// });

// it('should return an empty string when inputs are null or undefined', () => {
//   expect(new Cnx(null, NaN, undefined).toString()).toBe('');
// });

// it('should ignore boolean values', () => {
//   expect(new Cnx(true, false).toString()).toBe('');
// });

// it('should handle unsupported types gracefully', () => {
//   expect(new Cnx(() => Symbol('test')).toString()).toBe('');
// });

// it('should combine valid and invalid values correctly in serialize', () => {
//   expect(new Cnx('valid', null, 42, false).serialize()).toBe('valid 42');
// });

// test('string handles falsy values correctly in serialize', () => {
//   expect(new Cnx().serialize()).toEqual('');
// });

// test('string handles falsy values correctly in serialize with separator', () => {
//   expect(new Cnx('1', '2').serialize({ separator: 'x' })).toEqual('1x2');
// });

// it('should return an empty string when inputs are null or undefined', () => {
//   expect(trim(null)).toBe('');
// });

// it('should ignore boolean values', () => {
//   expect(trim(true, false)).toBe('');
// });

// it('should handle unsupported types gracefully', () => {
//   expect(trim(() => Symbol('test'))).toBe('');
// });

// it('should combine valid and invalid values correctly', () => {
//   expect(trim(['valid', null, 42, false], '')).toBe('valid42');
// });

// test('trim handles falsy values correctly', () => {
//   expect(trim(undefined)).toEqual('');
// });

// test('trim handles falsy values correctly', () => {
//   expect(trim(['1', '2'], 'x')).toEqual('1x2');
// });

test('should correctly export string as a named export', () => {
  expect(cnx).toBeDefined();
  expect(typeof cnx).toBe('function');
});

test('should correctly export string as the default export (alias x)', () => {
  expect(x.cnx).toBeDefined();
  expect(typeof x.cnx).toBe('function');
  expect(x.cnx).toBe(cnx); // Ensure both exports point to the same function
});

test('should include cnxSerialize in the namespace export', () => {
  expect(x).toHaveProperty('cnxSerialize');
  expect(x.cnx).toBe(cnx);
});

test('should include the default export alias in the namespace export', () => {
  expect(x).toHaveProperty('default');
  expect(x.cnx).toBe(cnx);
});
