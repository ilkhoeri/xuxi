"use client";

import React from "react";
import Link from "next/link";
import { useNavContext } from "./nav-ctx";
import { NavLinkItem } from "@/ui/navlink";
import { ButtonAside, LinkHome } from "./navhead";
import { cvx, cvxProps } from "cretex";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheets, SheetsContent, SheetsTrigger } from "@/ui/sheets";
import { displayName, FormatName } from "@/lib/text-parser";
import { cn as merge } from "@/lib/utils";
import { useApp } from "./config/app-context";
import { ChevronIcon } from "./icons";
import { ROUTES } from "@/routes";

import type { SingleRoute, NestedRoute, InnerRoutes } from "@/routes";

import style from "./nav.module.css";

interface NavLeftProps {
  classNames?: { aside?: string; overlay?: string };
  routes?: (InnerRoutes | SingleRoute | NestedRoute)[] | null;
}
export function NavLeft(_props: NavLeftProps) {
  const { classNames, routes = ROUTES["docs"] } = _props;
  const { rootSegment, minQuery, maxQuery: query, open, setOpen, toggle } = useNavContext();
  const { dir } = useApp();

  // if (rootSegment) return null;

  return (
    <>
      <aside data-state={query ? (open ? "open" : "closed") : undefined} {...getStyles("aside", { className: classNames?.aside })}>
        {query && (
          <hgroup {...getStyles("hgroup")}>
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

        <ScrollArea dir={dir} classNames={{ viewport: classes({ selector: "nav" }), thumb: "max-md:sr-only" }}>
          <NavRoutes {...{ routes, setOpen, query }} />
        </ScrollArea>
      </aside>

      <Overlay minQuery={minQuery} open={open} setOpen={setOpen} className={classNames?.overlay} />
    </>
  );
}

interface RequiredNavProps {
  query?: boolean;
  setOpen: (v: boolean) => void;
}

interface InnerItemProps extends RequiredNavProps, InnerRoutes {
  format?: FormatName;
}
function InnerItem(props: InnerItemProps) {
  const { title, href, format = "unformated", setOpen, query } = props;
  return (
    <NavLinkItem
      href={href}
      title={displayName(title, format)}
      className={style.link}
      onClick={() => {
        if (query) {
          setTimeout(() => {
            setOpen(false);
          }, 350);
        }
      }}
    />
  );
}

interface SingleItemProps extends RequiredNavProps {
  routes: InnerRoutes[];
}
function SingleItem({ routes, ...props }: SingleItemProps) {
  if (!routes || routes?.length === 0) return null;
  return routes.map((route, index) => <InnerItem key={index} {...route} {...props} />);
}

interface NavRoutesProps extends RequiredNavProps {
  routes: (InnerRoutes | SingleRoute | NestedRoute)[] | null;
}
const isNestedRoute = (route: SingleRoute | NestedRoute): route is NestedRoute => route.data.some(item => "data" in item);

function NavRoutes(props: NavRoutesProps) {
  const { routes, query, setOpen } = props;
  const required = { query, setOpen };

  if (!routes) return null;

  return routes.map((route, index) => {
    if ("data" in route) {
      // Jika ada elemen dalam `data` yang juga punya `data`, maka itu `NestedRoute`
      if (isNestedRoute(route)) {
        const nestedRoute = route;
        const value = nestedRoute.title.replace(/\s/g, "-").toLowerCase();
        return (
          <Sheets.Accordion key={`nested-${index}`} defaultOpen={value} className={style.collapse}>
            <Sheets.Item value={value}>
              <div data-sheets="trigger-snap">
                <InnerItem href={nestedRoute.href || ""} title={nestedRoute.title} {...required} />
              </div>
              <SheetsContent unstyled data-nested className="z-1 w-full">
                <NavRoutes routes={nestedRoute.data} {...required} />
              </SheetsContent>
            </Sheets.Item>
          </Sheets.Accordion>
        );
      } else {
        // Ini adalah `SingleRoute`, render campuran `InnerItem` dan `SingleItem`
        const singleRoute = route;
        const value = singleRoute.title.replace(/\s/g, "-").toLowerCase();
        return (
          <Sheets.Accordion key={`single-${index}`} defaultOpen={value} className={style.collapse}>
            <Sheets.Item value={value}>
              <div data-sheets="trigger-snap">
                <InnerItem href={singleRoute.href || ""} title={singleRoute.title} {...required} />
                <SheetsTrigger unstyled aria-label={singleRoute.title} {...getStyles("trigger")}>
                  <ChevronIcon chevron="down" data-sheets="chevron" />
                </SheetsTrigger>
              </div>
              <SheetsContent data-single>
                {singleRoute.data.map((item, i) =>
                  "data" in item ? <NavRoutes key={`nested-in-single-${i}`} routes={[item]} {...required} /> : <InnerItem key={`inner-${i}`} {...item} {...required} />
                )}
              </SheetsContent>
            </Sheets.Item>
          </Sheets.Accordion>
        );
      }
    } else {
      return <InnerItem key={`${route.href}-${index}`} {...route} {...required} />;
    }
  });
}

function Overlay({ minQuery, open, setOpen, className }: { minQuery?: boolean; open?: boolean; setOpen: (value: boolean) => void; className?: string }) {
  if (minQuery || !open) return null;

  return <span onClick={() => setOpen(false)} {...getStyles("overlay", { className })} />;
}

function getStyles(selector: NonNullable<cvxProps<typeof classes>["selector"]>, opts: { className?: string } = {}) {
  return { className: merge(classes({ selector }), opts.className) };
}

const classes = cvx({
  variants: {
    selector: {
      aside:
        "bg-background-theme w-0 m-0 h-[--aside-h] max-h-[--aside-h] [--aside-h:100dvh] md:[--aside-h:calc(100dvh-2rem)] md:mt-[2rem] top-0 bottom-0 md:sticky md:top-[calc(var(--navbar)+2rem)] max-md:data-[state=closed]:opacity-0 overflow-hidden md:transition-none [transition:all_0.5s_ease] focus-visible:outline-0 [--aside-w:calc(var(--aside)-1rem)] md:ltr:pr-6 md:ltr:pl-4 md:rtl:pl-6 md:rtl:pr-4 md:ltr:left-0 md:rtl:right-0 md:w-[--aside-w] md:min-w-[--aside-w] md:max-w-[--aside-w] max-md:fixed max-md:z-[111] max-md:ltr:left-0 max-md:rtl:right-0 max-md:border-0 max-md:ltr:border-r-[0.04rem] max-md:rtl:border-l-[0.04rem] max-md:border-muted/75 max-md:rtl:border-r-0 max-md:rtl:border-l max-md:data-[state=open]:w-[--aside-w] max-md:data-[state=open]:min-w-[--aside-w] max-md:data-[state=open]:max-w-[--aside-w] data-[state=open]:ltr:pl-6 data-[state=open]:ltr:pr-6 data-[state=open]:rtl:pr-3 max-md:data-[state=closed]:ltr:pl-0 max-md:data-[state=closed]:rtl:pr-0 max-md:data-[state=closed]:ltr:pr-0 max-md:data-[state=closed]:rtl:pl-0 max-md:pb-24 md:pb-20",
      hgroup: "mb-4 flex h-[--navbar] flex-row items-center justify-between md:sr-only md:hidden",
      nav: "relative items-start justify-start max-md:pt-0 overflow-y-auto overflow-x-hidden webkit-scrollbar px-4",
      overlay:
        " pl-8 rtl:pl-0 rtl:pr-8 text-color flex flex-row-reverse items-center gap-2 md:hidden md:sr-only fixed max-md:z-[95] w-full h-full min-w-full min-h-full inset-y-0 inset-x-0 backdrop-blur-[0.5px] bg-background-theme/15 supports-[backdrop-filter]:bg-background-theme/15",
      trigger: " flex items-center justify-center focus-visible:ring-inset focus-visible:ring-offset-[-2px] text-muted-foreground data-[state*=open]:text-color",
      snap: "font-medium text-sm w-full flex flex-row items-center max-md:active:text-color md:hover:text-color"
    }
  }
});
