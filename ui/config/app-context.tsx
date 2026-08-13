"use client";
import * as React from "react";
import { useDirection, type Direction } from "@/hooks/use-direction";
import { Cookies } from "./types";
import { useCookie } from "./cookies-client";

export enum Booleanish {
  true = "true",
  false = "false"
}

type CookiesName = `${Cookies}` | (string & {});
type Theme = "dark" | "light" | "system";

interface CtxProps {
  openAside: `${Booleanish}`;
  setOpenAside: (v: `${Booleanish}`) => void;
  setCookies?: (name: CookiesName, value: string) => Promise<void>;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
  // initial type
  dir: Direction;
  theme: Theme;
}

export const dataBooleanish: `${Booleanish}`[] = Object.values(Booleanish);
const ctx = React.createContext<CtxProps | undefined>(undefined);

export const useApp = () => {
  const _ctx = React.useContext(ctx);
  if (!_ctx) {
    throw new Error("main layout must be used within an <AppProvider>");
  }
  return _ctx;
};

function useCookieValues() {
  const [dir] = useCookie<Direction>("__dir", "ltr");
  const [theme] = useCookie<Theme>("__theme", "system");
  const [isOpenAside] = useCookie<boolean>("__is_open_aside", true);
  return { theme, dir, isOpenAside };
}

function useAppFuntions() {
  const { theme, dir: defaultDirection, isOpenAside } = useCookieValues();
  const [openAside, setOpenAside] = React.useState<`${Booleanish}`>(isOpenAside as any);
  const { dir, ..._direction } = useDirection({ defaultDirection: defaultDirection as Direction, detectDirection: false });
  return { theme, dir, openAside, setOpenAside, ..._direction };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { theme, ...app } = useAppFuntions();

  const value = { theme: theme as Theme, ...app };
  return <ctx.Provider {...{ value }}>{children}</ctx.Provider>;
}
