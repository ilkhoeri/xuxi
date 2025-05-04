<div align="center">
  <img src="https://raw.githubusercontent.com/ilkhoeri/xuxi/e0667835d62fcbf1f2e216dbb79ecf28565c571c/logo.svg" width="200px" align="center" alt="Xuxi logo" />
  <h1 align="center"><b>XUXI</b></h1>
</div>

## **Usages**

### **ocx**

```ts
import x from 'xuxi';

x.ocx(
  { a: 1 },
  [{ b: 2 }, { d: 4, e: null }, { f: undefined, g: NaN }],
  () => ({ c: 3 }),
  key => key?.a && { 'key?.a': key.a === 1 },
  {},
  0, // will be ignored
  'string', // will be ignored
  null, // will be ignored
  NaN // will be ignored
);
// { a: 1, b: 2, d: 4, c: 3, 'key?.a': true }
```

---

### **object**

- `.raw()`
  A version of ocx that performs deep merging without removing falsy values.

```ts
import x from 'xuxi';

const result = x.object.raw({ enabled: false, features: { darkMode: true } }, { features: { darkMode: null, betaMode: true } });

console.log(result);
// { enabled: false, features: { darkMode: null, betaMode: true } }
```

- `.preserve()`
  A version of ocx that performs a deep join without overwriting the value at the first key, only change the value if it does not exist and without removing falsy values.

```ts
import x from 'xuxi';

const obj1 = { key1: { nestedKey1: { subKey: 'value1', subKey3: false } } };
const objFn = () => ({ key1: { nestedKey1: { subKey: 'newValue1', subKey2: 'value2', subKey3: 'value3' } } });

const result = x.object.preserve(obj1, objFn);
console.log(result);
// {
//   key1: {
//     nestedKey1: { subKey: 'value1', subKey3: false, subKey2: 'value2' }
//   }
// }
```

---

### **cvx**

```ts
import x from 'xuxi';

const classes = x.cvx({
  // assign values that is definitely returned
  assign: 'bg-muted rounded-sm px-2 border flex items-center justify-center',
  variants: {
    variant: {
      light: 'font-light',
      bold: 'font-bold',
      semibold: 'font-semibold'
    },
    effect: {
      italic: 'font-italic'
    },
    color: {
      blue: 'text-blue-600',
      green: 'text-green-700',
      red: 'text-red-500',
      purple: 'text-purple-500'
    },
    size: {
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-10',
      xl: 'h-14'
    }
  },
  // determine the variance value by default
  defaultVariants: {
    variant: 'bold',
    color: 'blue',
    size: 'lg'
  }
});
```

---

### **cnx**

```ts
import x from 'xuxi';

// allows receiving Arrays, Objects and Functions
x.cnx(['', baz, (foo as string) !== 'foo' && bar], { '': !props }, '', () => ({ '' }), undefined, [{ '' }, () => ({ '' })]);
```

---

### **clean**

```ts
import x from 'xuxi';

const cleanedObject = {
  name: 'Bob',
  age: null,
  active: false,
  score: 0,
  address: ''
};

console.log(x.clean(cleanedObject));
// { name: "Bob" }

console.log(x.clean(cleanedObject, [0]));
// { name: "Bob", score: 0 }
```

---

## **Documentation**

[![Documentation](https://img.shields.io/badge/Docs-3b3b3b.svg?logo=github)](https://ilkhoeri.github.io/xuxi/)
[![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/xuxi?logo=jsdelivr)](https://www.jsdelivr.com/package/npm/xuxi)

## **Repository**

[![Repository](https://img.shields.io/badge/created%20by-@ilkhoeri-4bbaab.svg?logo=github)](https://github.com/ilkhoeri/xuxi)
[![Issues](https://img.shields.io/badge/Issues-red.svg?label=%F0%9F%90%9E)](https://github.com/ilkhoeri/xuxi/issues/new)
[![Changelog](https://img.shields.io/badge/Changelog-green.svg?label=%F0%9F%93%91)](/changelog)
[![License](https://img.shields.io/github/license/ilkhoeri/xuxi)](https://opensource.org/licenses/MIT)

## **Installation**

[![NPM](https://img.shields.io/npm/v/xuxi.svg?logo=npm&logoColor=white&labelColor=cc3534)](https://www.npmjs.com/package/xuxi)
[![JSR](https://jsr.io/badges/@xuxi/xuxi?label=jsr)](https://jsr.io/@xuxi/xuxi)
[![DENO](https://img.shields.io/npm/v/xuxi.svg?logo=deno&logoColor=white&logoSize=auto&label=%20deno&labelColor=blue&color=white)](https://deno.land/x/xuxi)
[![jsdelivr](https://img.shields.io/npm/v/xuxi.svg?logo=jsdelivr&label=jsdelivr&color=fdC72e)](https://www.jsdelivr.com/package/npm/xuxi)

## **Bundles**

[![min](https://badgen.net/bundlephobia/min/xuxi)](https://bundlephobia.com/package/xuxi)
[![minzip](https://badgen.net/bundlephobia/minzip/xuxi)](https://bundlephobia.com/package/xuxi)
[![dependency-count](https://badgen.net/bundlephobia/dependency-count/xuxi)](https://bundlephobia.com/package/xuxi)
[![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/xuxi)](https://bundlephobia.com/package/xuxi)

## **Score and Test**

[![JSR Score](https://jsr.io/badges/@xuxi/xuxi/score?label=score)](https://jsr.io/@xuxi/xuxi)
[![test](https://github.com/ilkhoeri/xuxi/actions/workflows/test.yml/badge.svg)](https://github.com/ilkhoeri/xuxi/actions/workflows/test.yml)
