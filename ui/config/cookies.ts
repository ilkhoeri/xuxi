"use cilent";
import { Cookies } from "./types";
import { useEffect, useState } from "react";

type CookiesName = `${Cookies}` | (string & {});

export function setCookies(name: CookiesName, value: string, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

export function useCookies<T extends string>(name: CookiesName, initial: T) {
  const [cookieValue, setCookieValue] = useState(initial as string);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${name}=`))
      ?.split("=")[1];

    if (cookies) setCookieValue(decodeURIComponent(cookies));
  }, []);

  return cookieValue;
}

export function useCookiesValues() {
  const dir = useCookies("__dir", "ltr");
  const theme = useCookies("__theme", "system");
  const isOpenAside = useCookies("__is_open_aside", "true");

  return { dir, theme, isOpenAside };
}