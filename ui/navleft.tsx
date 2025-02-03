"use client";

import React from "react";
import { useNavContext } from "./nav-ctx";
import { NavLinkItem } from "@/ui/navlink";
import { ButtonAside, LinkHome } from "./navhead";
import { cvx } from "cretex";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheets, SheetsContent, SheetsTrigger } from "@/ui/sheets";
import { displayName } from "@/lib/text-parser";
import { cn as merge } from "@/lib/utils";
import { useApp } from "./config/app-context";

import { ROUTES } from "@/routes";
import type { SingleRoute, NestedRoute, InnerRoutes } from "@/routes";

import style from "./nav.module.css";

const docsRoutes = [
  {
    title: "Docs",
    href: "/",
    data: [
      { title: "ocx", href: "/ocx" },
      { title: "cvx", href: "/cvx" },
      { title: "cnx", href: "/cnx" },
      { title: "clean", href: "/clean" },
      { title: "links", href: "/links" },
      { title: "license", href: "/license" },
      { title: "Code of conduct", href: "/coc" },
      { title: "others", href: "/others" }
    ]
  },
  {
    title: "About",
    href: "/about",
    data: [{ title: "About app", href: "/about/app" }]
  }
];

const headSegment: InnerRoutes[] = [
  { title: "Getting Started", href: "/" },
  { title: "Table of Contents", href: "/toc" }
];

interface NavLeftProps {
  classNames?: { aside?: string; overlay?: string };
  routes?: (SingleRoute | NestedRoute)[] | null;
  headRoutes?: InnerRoutes[];
}
export function NavLeft(_props: NavLeftProps) {
  const { classNames, routes = ROUTES["docs"], headRoutes = ROUTES["docsHead"] } = _props;
  const { rootSegment, minQuery, maxQuery: query, open, setOpen, toggle } = useNavContext();
  const { dir } = useApp();

  // if (rootSegment) return null;

  return (
    <>
      <aside data-state={query ? (open ? "open" : "closed") : undefined} className={merge(classes({ style: "aside" }), classNames?.aside)}>
        {query && (
          <hgroup className={classes({ style: "hgroup" })}>
            <LinkHome />
            <ButtonAside
              {...{
                open,
                setOpen,
                hidden: minQuery,
                onClick: toggle,
                className: "mr-1.5 rtl:mr-0 rtl:ml-1.5"
              }}
            />
          </hgroup>
        )}

        <ScrollArea dir={dir} classNames={{ viewport: classes({ style: "nav" }), thumb: "max-md:sr-only" }}>
          <HeadRoutes {...{ routes: headRoutes, setOpen, query }} />
          <NavRoutes {...{ routes, setOpen, query }} />
        </ScrollArea>
      </aside>

      <Overlay minQuery={minQuery} open={open} setOpen={setOpen} className={classNames?.overlay} />
    </>
  );
}

interface HeadRoutesProps {
  routes: InnerRoutes[];
  setOpen: (v: boolean) => void;
  query: boolean | undefined;
}
function HeadRoutes(props: HeadRoutesProps) {
  const { routes, query, setOpen } = props;
  if (!routes) return null;
  return routes.map((i, _i) => (
    <NavLinkItem
      key={_i}
      href={i.href}
      title={i.title}
      className="z-9 text-muted-foreground data-[path=active]:text-constructive flex w-full select-none flex-row flex-nowrap items-center justify-between rounded-sm py-1 text-sm font-medium focus-visible:ring-inset focus-visible:ring-offset-[-2px]"
      onClick={() => {
        if (query) {
          setTimeout(() => {
            setOpen(false);
          }, 500);
        }
      }}
    />
  ));
}

interface NavRoutesProps {
  routes: (SingleRoute | NestedRoute)[] | null;
  query?: boolean;
  setOpen: (v: boolean) => void;
}
function NavRoutes(props: NavRoutesProps) {
  const { routes, query, setOpen } = props;
  if (!routes) return null;

  function Item({ routes }: { routes: InnerRoutes[] }) {
    return routes?.map((route, index) => (
      <NavLinkItem
        key={index}
        href={route.href}
        title={displayName(route.title)}
        className={style.link}
        onClick={() => {
          if (query) {
            setTimeout(() => {
              setOpen(false);
            }, 500);
          }
        }}
      />
    ));
  }

  return routes.map((route, index) => {
    if ((route as NestedRoute).data[0].data) {
      const nestedRoute = route as NestedRoute; // Handle NestedRoute
      return (
        <Sheets.Collapsible key={index} defaultOpen className={style.collapse}>
          <SheetsTrigger unstyled type="button" className={classes({ style: "trigger" })}>
            <span className="truncate">{displayName(nestedRoute.title)}</span>
          </SheetsTrigger>
          <SheetsContent unstyled data-origin="content" className="z-1 w-full">
            <NavRoutes routes={nestedRoute.data} {...{ query, setOpen }} />
          </SheetsContent>
        </Sheets.Collapsible>
      );
    } else {
      const singleRoute = route as SingleRoute; // Handle SingleRoute
      return (
        <Sheets.Collapsible key={index} defaultOpen className={style.collapse}>
          <SheetsTrigger unstyled className={classes({ style: "trigger" })}>
            <span className="truncate">{displayName(singleRoute.title)}</span>
          </SheetsTrigger>
          <SheetsContent data-inner-collapse="">
            <Item routes={singleRoute.data} />
          </SheetsContent>
        </Sheets.Collapsible>
      );
    }
  });
}

function Overlay({ minQuery, open, setOpen, className }: { minQuery?: boolean; open?: boolean; setOpen: (value: boolean) => void; className?: string }) {
  if (minQuery || !open) return null;

  return <span onClick={() => setOpen(false)} className={merge(classes({ style: "overlay" }), className)} />;
}

const classes = cvx({
  variants: {
    style: {
      aside:
        "bg-background-theme w-0 m-0 h-[--aside-h] max-h-[--aside-h] [--aside-h:100dvh] md:[--aside-h:calc(100dvh-2rem)] md:mt-[2rem] top-0 bottom-0 md:sticky md:top-[calc(var(--navbar)+2rem)] max-md:data-[state=closed]:opacity-0 overflow-hidden md:transition-none [transition:all_0.5s_ease] focus-visible:outline-0 [--aside-w:calc(var(--aside)-1rem)] md:ltr:pr-6 md:ltr:pl-4 md:rtl:pl-6 md:rtl:pr-4 md:ltr:left-0 md:rtl:right-0 md:w-[--aside-w] md:min-w-[--aside-w] md:max-w-[--aside-w] max-md:fixed max-md:z-[111] max-md:ltr:left-0 max-md:rtl:right-0 max-md:border-0 max-md:ltr:border-r-[0.04rem] max-md:rtl:border-l-[0.04rem] max-md:border-muted/75 max-md:rtl:border-r-0 max-md:rtl:border-l max-md:data-[state=open]:w-[--aside-w] max-md:data-[state=open]:min-w-[--aside-w] max-md:data-[state=open]:max-w-[--aside-w] data-[state=open]:ltr:pl-6 data-[state=open]:ltr:pr-6 data-[state=open]:rtl:pr-3 max-md:data-[state=closed]:ltr:pl-0 max-md:data-[state=closed]:rtl:pr-0 max-md:data-[state=closed]:ltr:pr-0 max-md:data-[state=closed]:rtl:pl-0 max-md:pb-24 md:pb-20",
      hgroup: "mb-4 flex h-[--navbar] flex-row items-center justify-between md:sr-only md:hidden",
      nav: "relative items-start justify-start max-md:pt-0 overflow-y-auto overflow-x-hidden webkit-scrollbar pl-4 pr-1.5 rtl:pr-4 rtl:pl-1.5",
      overlay:
        "text-color flex flex-row-reverse items-center gap-2 md:hidden md:sr-only fixed max-md:z-[95] w-full h-full min-w-full min-h-full inset-y-0 inset-x-0 backdrop-blur-[0.5px] bg-background-theme/15 supports-[backdrop-filter]:bg-background-theme/15",
      trigger:
        "font-medium text-sm w-full flex items-center justify-start focus-visible:ring-inset focus-visible:ring-offset-[-2px] text-muted-foreground data-[state*=open]:text-color max-md:active:text-color md:hover:text-color"
    }
  }
});
