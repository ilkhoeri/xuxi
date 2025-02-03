"use client";

import * as React from "react";
import { tocopy } from "../lib/utils";
import { cn } from "@/lib/utils";
import { useClipboard } from "@/hooks/use-clipboard";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import { UnstyledButton } from "@/components/button";
import { CheckIcon, CopyIcon, ChevronDownSquareIcon } from "@/components/icons";

export const CopyButton = React.forwardRef<
  React.ComponentRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton> & {
    value: string | null | undefined;
  }
>(({ value, className, ...props }, ref) => {
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <UnstyledButton
      ref={ref}
      {...props}
      tabIndex={-1}
      onClick={() => {
        if (value) clipboard.copy(tocopy(value));
      }}
      disabled={!value}
      className={cn(
        "inline-flex items-center justify-center rounded-md ring-offset-background transition-colors text-muted-foreground [@media(hover:hover)]:hover:bg-muted/75 [@media(hover:hover)]:hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sizer [--sz:32px] p-0.5 bg-background",
        className
      )}
      suppressHydrationWarning>
      {clipboard.copied ? <CheckIcon className="size-5 animate-fade-in fade-in-0 zoom-in-0 [animation-duration:150ms]" /> : <CopyIcon className="size-5" />}
    </UnstyledButton>
  );
});
CopyButton.displayName = "CopyButton";

export const ScrollToggle = React.forwardRef<React.ComponentRef<typeof UnstyledButton>, React.ComponentPropsWithoutRef<typeof UnstyledButton>>(({ className, ...props }, ref) => {
  const { bottom, scrollWindow, mounted } = useWindowScroll();
  // const [hovered, setHovered] = React.useState(false);
  // const visible = hovered || isScroll;

  if (!mounted) return null;

  const label = bottom ? "Scroll to Top" : "Scroll to Bottom";
  return (
    <UnstyledButton
      ref={ref}
      {...props}
      tabIndex={-1}
      aria-label={label}
      title={label}
      onClick={scrollWindow}
      className={cn(
        "fixed bottom-4 right-4 z-[99] mr-[--scrollbar-space,var(--has-scrollbar)] flex size-8 cursor-pointer select-none items-center justify-center rounded-xl border border-muted-foreground/40 bg-background/40 p-0.5 capitalize text-muted-foreground/90 outline-0 backdrop-blur transition-none duration-0 disabled:pointer-events-none disabled:opacity-50 supports-[backdrop-filter]:bg-background/40 [&_svg]:size-full",
        "after:absolute after:left-0 after:h-8 after:w-12 after:content-['']",
        className
      )}>
      <ChevronDownSquareIcon
        style={{
          rotate: bottom ? "180deg" : "0deg",
          transition: "rotate 0.3s"
        }}
      />
    </UnstyledButton>
  );
});
ScrollToggle.displayName = "ScrollToggle";
