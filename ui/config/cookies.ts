"use cilent";
import * as React from "react";
import { Cookies } from "./types";
import { useLocalStorage } from "@/hooks/use-local-storage";

export type CookiesName = `${Cookies}` | (string & {});

function useStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [getStoredValue, setStoredValue] = useLocalStorage<T>({
    key,
    initialValue
  });

  return [getStoredValue!, setStoredValue] as const;
}

export function useConfig<T extends string>(name: CookiesName, value: T) {
  const [config, setConfig] = useStorage<T>(name, value);

  return [config, setConfig] as const;
}

export function useCookies<T extends string>(name: CookiesName, initial: T, value: string | undefined) {
  const [config, setConfig] = useConfig(name, value || initial);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getCookie = React.useCallback(() => {
    const cookies = mounted
      ? document.cookie
          .split("; ")
          .find(row => row.startsWith(`${name}=`))
          ?.split("=")[1]
      : config;
    return cookies ? decodeURIComponent(cookies) : initial;
  }, [name, initial, mounted]);

  const [cookieValue, setCookieValue] = React.useState(getCookie);

  React.useEffect(() => {
    setCookieValue(getCookie());
  }, [getCookie]);

  const setCookie = React.useCallback(
    (value: string, days = 365) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
      setCookieValue(value);
      setConfig(value);
    },
    [name]
  );

  return [config, setConfig] as const;
}

export function setCookies(name: CookiesName, value: string, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

// export function useCookiesValues() {
//   const dir = useCookies("__dir", "ltr");
//   const theme = useCookies("__theme", "system");
//   const isOpenAside = useCookies("__is_open_aside", "true");

//   return { dir, theme, isOpenAside };
// }
