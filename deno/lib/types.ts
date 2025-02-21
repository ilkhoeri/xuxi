/**
 * A utility type that infers the return type of a given function type.
 *
 * @template T - The input type, which should ideally be a function.
 * @returns The inferred return type of the function if `T` is a function type; otherwise, `never`.
 * @example
 * const MyFunction = () => {};
 * type Result = inferFn<typeof MyFunction>; // type Result = void.
 * @see {@link https://ilkhoeri.github.io/xuxi/types#inferfn Docs}
 */
export type inferFn<T> = T extends (...args: any[]) => infer R ? R : never;
