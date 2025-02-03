"use client";
import { useCallback, Ref, useRef, RefObject } from "react";

export type PossibleRef<F> = Ref<F> | RefObject<F | null> | undefined;

export function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    (ref as RefObject<T>).current = value;
  }
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    refs.forEach(ref => assignRef(ref, node));
  };
}

export function createRefs<F, U extends string>(keys: U[]): { [K in U]: React.RefObject<F> } {
  return keys.reduce(
    (acc, key) => {
      (acc as { [K in U]: RefObject<F | null> })[key] = useRef<F>(null);
      return acc;
    },
    {} as { [K in U]: React.RefObject<F> }
  );
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  return useCallback(mergeRefs(...refs), refs);
}
