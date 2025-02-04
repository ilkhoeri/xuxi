"use client";
import * as React from "react";
import { CookiesName, useConfig, useCookies } from "./cookies";
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
  useCookies<T extends string>(name: CookiesName, initial: T, value: string | undefined): readonly [string, (value: string, days?: number) => void];
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
  // const [initialisOpenAside] = useCookies("__is_open_aside", "true", _app.isOpenAside);
  // const [initialTheme] = useCookies("__theme", "system", _app.theme);
  // const [initialDirection] = useCookies("__dir", "ltr", _app.dir);

  const { isOpenAside = "true", theme = "system", dir = "ltr", ...others } = _app;
  const [openAside, _setOpenAside] = React.useState<`${Booleanish}`>(isOpenAside as `${Booleanish}`);
  const [openAsideConfig, setOpenAsideConfig] = useConfig("__is_open_aside", openAside as `${Booleanish}`);

  const { dir: _dir, toggleDirection: toggleDir, ..._direction } = useDirection({ initialDirection: dir as Direction });
  const [dirConfig, setDirConfig] = useConfig("__dir", dir as Direction);

  const toggleDirection = () => {
    toggleDir();
    setDirConfig(dir === "ltr" ? "rtl" : "ltr");
  };

  const setOpenAside = (v: `${Booleanish}` = isOpenAside === "true" ? "false" : "true") => {
    _setOpenAside(v);
    setOpenAsideConfig(v);
  };

  return { theme, dir: dirConfig, openAside: openAsideConfig, setOpenAside, toggleDirection, ..._direction, ...others };
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
