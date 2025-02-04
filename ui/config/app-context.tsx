"use client";
import * as React from "react";
import { CookiesName, setCookies, useCookies } from "./cookies";
import { Cookies } from "./types";
import { useDirection, type Direction } from "@/hooks/use-direction";

export enum Booleanish {
  true = "true",
  false = "false"
}
type Theme = "dark" | "light" | "system";
type __T_ = "dir" | "theme" | "isOpenAside"; // cookies value
type IntrinsicAppProvider = Partial<Record<__T_, string | undefined>>;
type useAppProps = IntrinsicAppProvider & {};
interface AppProviderProps extends IntrinsicAppProvider {
  children: React.ReactNode;
}
interface CtxProps {
  openAside: `${Booleanish}`;
  setOpenAside: (v: `${Booleanish}`) => void;
  // setCookies(name: `${Cookies}` | (string & {}), value: string): Promise<void>;
  useCookies<T extends string>(name: CookiesName, initial: T): readonly [string, (value: string, days?: number) => void];
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

function useAppFuntions(_app: useAppProps) {
  const [initialisOpenAside] = useCookies("__is_open_aside", "true");
  const [initialTheme] = useCookies("__theme", "system");
  const [initialDirection] = useCookies("__dir", "ltr");

  const { isOpenAside = initialisOpenAside, theme = initialTheme, dir = initialDirection, ...others } = _app;
  const [openAside, setOpenAside] = React.useState<`${Booleanish}`>(isOpenAside as `${Booleanish}`);
  const { dir: _dir, ..._direction } = useDirection({ initialDirection: dir as Direction });
  return { theme, dir: _dir, openAside, setOpenAside, ..._direction, ...others };
}

export function AppProvider({ children, ...props }: AppProviderProps) {
  const { theme, ...app } = useAppFuntions({ ...props });

  const value = { useCookies, theme: theme as Theme, ...app };
  return (
    <ctx.Provider {...{ value }}>
      <html lang="en" dir={app.dir} suppressHydrationWarning>
        {children}
      </html>
    </ctx.Provider>
  );
}
