# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Be sure to always refer to the latest documentation for the most up-to-date usage guidelines.

---

## [1.0.3] - 2025-10-28

### Refactor API: rename object to ocx, update cnx exports

- Replaces all references to the 'object' API with 'ocx' for consistency, updates documentation and tests accordingly, and refactors cnx exports to provide named serialization utilities (cnxSerialize, cnxRecursive, cnxInstance). Also updates build scripts and version numbers to 1.0.3. This change improves clarity and aligns the API with current naming conventions.

## [1.0.2] - -

## [1.0.1] - 2025-05-18

### Added

- Enhanced `cvx` function to support variant keys with stringified falsy values such as `'false'`, `'null'`, `'undefined'` by automatically mapping input values like `false`, `null`, and `undefined` to their corresponding string keys.
- Introduced a utility type `cvxPrimitiveCast<T>` to map variant string keys to their respective primitive types, e.g.:

  - `'true'` → `true`
  - `'false'` → `false`
  - `'null'` → `null`
  - `'undefined'` → `undefined`
  - Numeric strings (including decimals, e.g. `'1.5'`) → numeric literals (e.g. `1.5`)

- Updated `cvxResult<T>` type to leverage `cvxPrimitiveCast`, making variant input types reflect accurate primitive types instead of string literals. This improves type safety and developer DX by enabling:

  - `variants: { state: { true: ..., false: ... } }` to infer `{ state?: true | false | undefined }`
  - `variants: { size: { "0": ..., "1": ... } }` to infer `{ size?: 0 | 1 | undefined }`

- Extended `cvxPrimitiveCast` to support special numeric values `'Infinity'` and `'NaN'` by mapping them to their respective JS constants `Infinity` and `NaN`, allowing variants like:

  - `{ state: { Infinity: 'IS_INFINITY', NaN: 'IS_NAN' } }`
    and input usage like `xx({ state: Infinity })`.

### Fixed

- Fixed type narrowing to correctly handle falsy variant keys when variant input values are boolean, `null`, or `undefined` (instead of only strings).

### Notes

- The improved `cvxPrimitiveCast` utility can be further extended to support other special cases or custom mappings as needed.
- The runtime logic in `cvx` now coerces variant input values to strings to check variant keys, supporting flexible input without sacrificing type safety.

---

## [1.0.0] - 2025-05-05

### **Enhancements**

- **Explicit Type on `clean()`**
  Added explicit type annotation for the `seen` parameter in `clean()`, ensuring better type safety and improving developer experience.

### **Documentation**

- **New Documentation Page**
  Introduced a dedicated [**documentation page**](https://ilkhoeri.github.io/xuxi/) for improved readability and accessibility.
- **Centralized Examples & Usage**
  All code examples and usage guidelines are now directed to the [**documentation page**](https://ilkhoeri.github.io/xuxi/), ensuring consistency and ease of reference.
- **Refined Symbol Documentation**
  Simplified and enhanced symbol documentation for better clarity and maintainability.

### **Summary**

This release focuses on improving type safety, refining documentation, and ensuring a more structured approach to learning and utilizing the library.

### Changed

#### **Refactored:**

- `object`

  - **Improvements:** Covers all scenarios that were present in the `object.raw()` implementation, including:

    - **Replaced** `new WeakSet<object>()` with `new WeakMap<object, object>()` to avoid duplicate processing of nested objects and prevent infinite loops.
    - **Created** a separate `merge()` function to make it more modular.
    - **Avoided direct mutation of `acc`** to make it safer and more predictable.
    - **Ensures that processed object references** are not reprocessed.
    - **Supports all previous scenarios** more efficiently.
    - **Supports arrays as input** and processes the elements in the array with recursion.
    - **Supports functions as input** and executes their results to get the objects to merge.
    - **Supports deep object merging** using recursion with [`object.raw`](./src/ocx.ts).
    - **Use `Reflect.ownKeys()` to handle `Symbol` property** to avoid losing special keys.
    - **Maintain compatibility with various input types (objects, functions, arrays, symbols, etc.)**

  - **Handling Scheme Comparison**

    | **Scenario**                                        | **Previous**                   | **Update**                          |
    | --------------------------------------------------- | ------------------------------ | ----------------------------------- |
    | **Recursively merge objects**                       | ✅ Yes                         | ✅ Yes, safer                       |
    | **Handle arrays and merge their elements**          | ✅ Yes                         | ✅ Yes, more optimal                |
    | **Run functions as input and merge the results**    | ✅ Yes                         | ✅ Yes, more modular                |
    | **Prevent infinite loops due to cyclic references** | ✅ Yes, `WeakSet` is used      | ✅ Yes, `WeakMap` is more effective |
    | **Handle symbols (`Symbol`) as keys**               | ✅ `Reflect.ownKeys()` is used | ✅ Still used                       |
    | **Use `Reflect.ownKeys()` to handle `Symbol`**      | ⚠️ Sometimes                   | ✅ Always now                       |
    | **Prevent direct mutation on `acc`**                | ⚠️ Happens sometimes           | ✅ Fixed, safer                     |
    | **Avoid reprocessing the same object**              | ❌ Not yet                     | ✅ `WeakMap` ensures this           |
    | **More modular by separating `merge()` function**   | ❌ No separation               | ✅ Yes, more modular                |

  - **Conclusion:**
    **Functionality remains the same as the previous version** but now it is more **optimal**, **secure**, and **easier to maintain**.

  - **Removed:**

    - `.clean()` chaining, as `object` now **removes falsy values by default**.

  - **Introduced:**

    - `.raw()` chaining to **preserve falsy values** when needed.
    - `.preserve()` chaining to **preserve root values without overwriting**, only change the value if it does not exist.

  - **Added**:

    - Support handles merging objects containing `Symbol` keys.
    - Support for `Symbol` as object keys in `object` and `object.raw()`.

  - **Fixed**:

    - Issue where `Symbol` keys were ignored during merging.

### Removed

- **`cleanFalsy`**. Now a **standalone function** as `clean` with **higher flexibility**
  - **Improved**:
    - **Preserves:** `Symbol` keys while still removing falsy values.
    - **implementation:** to use `seen = new WeakSet<object>()` by default, preventing infinite recursion and improving performance.
  - Improved **deep cleaning** for objects, empty objects, arrays, and mixed data structures.
  - Added **new documentation** section for `clean()`.

---

## [0.1.0] - 2025-05-04

### Added

- Added `cleanFalsy` function and chaining support for `ocx` (`.clean()`).
- Enhanced `ocxMap` type to support functions with an optional key parameter: `((key?: ocxKey) => ocxMap)`, enabling usage like:
  ```ts
  ocx([{}, key => key?.role === 'admin' && { permissions: ['read', 'write', 'delete'] }]);
  ```
- Provided `symbol documentation` for all functions.
- Introduced official documentation: [ilkhoeri.github.io/xuxi](https://ilkhoeri.github.io/xuxi/).
- Version now available and installable via [JSR](https://jsr.io/@xuxi/dynamic).
- Added support for **Deno**.
- Expanded test coverage to ensure all possible return scenarios are validated for each function.

### Changed

Migrated from `bun` to `yarn`. Now, all command processes use `yarn` instead of `bun`.

- Updated `cnx` function to trim whitespace by modifying:
  ```ts
  inputs.join(' '); // previous
  inputs.join(' ').trim(); // updated
  ```
- Updated `cvx` function to trim whitespace by modifying:

  ```ts
  variants.filter(Boolean).join(' '); // previous
  variants
    .filter(Boolean)
    .join(' ')
    .trim() // updated

    [(keys.assign, variants)].join(' ') // previous
    [(keys.assign, variants)].join(' ')
    .trim(); // updated
  ```

### Removed

- **Removed dependency on `tailwind-merge`**, meaning `cn()` and `merge()` functions are no longer included.
- If needed, users must implement their own `cn` utility as follows:

  ```ts
  import { twMerge } from 'tailwind-merge';
  import { cnx, type cnxValues } from 'xuxi';

  export function cn(...merge: cnxValues[]): string {
    return twMerge(cnx(...merge));
  }
  ```

---

## [0.0.1] - 2025-01-25

### Added

- Added build pipeline using **Rollup**, replacing **tsup**.
- Integrated **Babel** and **babel-jest** for ESNext compatibility and testing.
- Configured **Jest** for unit testing all utility functions.
- Set up **Husky** for pre-commit hooks, ensuring code quality with linting and testing.
- Introduced **TSX** for TypeScript execution during development.
- Added global handling for `tailwind-merge` in Rollup configuration to fix warnings during UMD build.

### Changed

- Migrated the build system from **tsup** to **Rollup** for better output customization and support for different module formats (CJS, ESM, UMD).
- Improved overall testing coverage with comprehensive test cases for utility functions:
  - `ocx`
  - `cvx`
  - `merge` and `cn`
  - `converter` utilities (`rem`, `em`, `px`, etc.).
- Updated build targets to include better support for CommonJS and UMD environments.

### Fixed

- Fixed warnings related to unresolved dependencies for `tailwind-merge` during the build process by marking it as an external dependency and defining proper global variables.

---

## [0.0.0] - 2025-01-23

### Added

- Initial release with the following utility functions:
  - `ocx`: For merging objects with flexible input types.
  - `cvx`: For handling class variants with default and dynamic options.
  - `merge` and `cn`: Simplified merging of class names with `tailwind-merge`.
  - `converter` utilities:
    - `rem`, `em`: Converts pixel values to rem/em with optional scaling.
    - `px`: Parses and transforms pixel values to their numerical representation.

### Changed

- Built with **tsup** for streamlined TypeScript bundling.
