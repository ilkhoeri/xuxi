"use client";

import Link from "next/link";
import { useApp } from "./config/app-context";
import { cn } from "@/lib/utils";
import { LogoIcon, TextDirectionIcon } from "./icons";
import { Polymorphic } from "./polymorphic-slot";
import { Button } from "./button";
import { ROUTES } from "@/routes";
import { NavLinkItem } from "./navlink";
import { Burger } from "./burger";
import { useNavContext } from "./nav-ctx";

export function NavHead() {
  const { toggleDirection, dir } = useApp();
  const { minQuery, toggle, open, setOpen } = useNavContext();

  return (
    <header
      dir={dir}
      className={cn(
        "max-w-var border-b-muted/75 bg-background-theme/95 supports-[backdrop-filter]:bg-background-theme/60 fixed inset-x-0 top-0 z-[--z,88] mr-[--has-scrollbar] flex h-[--navbar] w-[calc(100%-var(--has-scrollbar,0px))] items-center justify-between border-0 border-b-[0.04rem] py-4 backdrop-blur md:px-5 xl:px-6"
      )}
    >
      <Polymorphic dir={dir} className="max-w-screen-3xl 3xl:px-12 relative mx-auto flex w-full items-center">
        <LinkHome className="[transition:all_0.5s_ease] max-md:data-[state=open]:translate-x-[-32px] max-md:data-[state=open]:opacity-0" />

        <div dir={dir} className="flex items-center ltr:ml-auto rtl:mr-auto [&_svg]:size-[1.375rem] gap-1.5">
          <div className="grid grid-flow-col gap-0.5">
            <LinksSection />
            <Button size="icon" variant="outline" onClick={toggleDirection} className="max-md:hidden">
              <TextDirectionIcon dir={dir} stroke={1.5} />
            </Button>
          </div>
        </div>

        <ButtonAside
          {...{ open, setOpen, onClick: toggle }}
          hidden={minQuery}
          className="max-md:mx-2 max-md:data-[state=open]:translate-x-[212px] max-md:data-[state=open]:opacity-0 ltr:[--x:calc(212px)] rtl:[--x:calc(212px*-1)]"
        />
      </Polymorphic>
    </header>
  );
}

export function LinkHome({ open, className }: { open?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="oeri"
      data-state={open ? (open ? "open" : "closed") : undefined}
      className={cn("font-geist-mono gap-2 rounded-lg px-2 py-1 text-lg font-medium leading-none", className)}
    >
      <LogoIcon size={30} />
      <span>Cretex</span>
    </Link>
  );
}

function LinksSection() {
  return ROUTES["sections"].map((i, __i) => (
    <NavLinkItem
      key={__i}
      icon={i.icon}
      target="_blank"
      aria-label={i.label}
      href={i.href}
      iconProps={{
        currentFill: i.label.includes("Collective") ? "fill-stroke" : "fill",
        fill: "white",
        stroke: "white"
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md ring-offset-background-theme transition-colors text-muted-foreground [@media(hover:hover)]:hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-color sizer [--sz:32px] p-0.5 bg-[--color] border border-background-theme focus-visible:ring-[--color] [&_svg]:hover:text-white hover:bg-[--color] [@media(hover:hover)]:hover:bg-[--color] max-md:hidden max-md:last-of-type:flex"
      )}
      style={{
        "--color": i.color
      }}
    />
  ));
}

export function ButtonAside(_props: React.ComponentProps<typeof Burger>) {
  const { hidden, open, onClick, setOpen, className } = _props;
  if (hidden) return null;
  return (
    <Burger
      {...{
        open,
        setOpen,
        className: cn("relative z-10 scale-100 opacity-100 md:sr-only md:hidden lg:scale-0 lg:opacity-0", className),
        onClick
      }}
    />
  );
}
