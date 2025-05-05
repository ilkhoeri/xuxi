"use client";

import * as React from "react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";
import { NpmCommands } from "./rehype/types";
import { Event } from "./rehype/event";
import { CopyButton } from "./toggle";
import { CodeBlockCommand } from "./rehype/rehype-command";

const components = {
  Image,
  Typography,
  _A_: ({ href = "", ...props }: Omit<LinkProps, "href"> & { href?: string }) => <Link href={href} {...props} target="_blank" rel="noopener noreferrer nofollow" />,
  a: ({ href = "", ...props }: Omit<LinkProps, "href"> & { href?: string }) => <Link href={href} {...props} />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h1" role="presentation" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h2" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h3" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h4" {...props} />,
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h5" {...props} />,
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h6" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography prose="p" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <Typography el="ul" prose="ul" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <Typography el="ol" prose="ol" {...props} />,
  li: (props: React.HTMLAttributes<HTMLElement>) => <Typography el="li" prose="li" {...props} />,
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-4 md:my-8" {...props} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div data-table="scroll-area" className="my-6">
      <table {...props} />
    </div>
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th {...props} />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "relative isolate my-8 flex flex-col items-start rounded-xl bg-background-box py-6 pl-12 pr-4 [unicode-bidi:isolate] before:absolute before:left-6 before:z-[10] before:h-4/5 before:w-1 before:bg-[#202425] before:content-[''] before:inset-y-1/2 before:-translate-y-1/2",
        className
      )}
      {...props}
    />
  ),
  details: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <summary className={cn("my-4", className)} {...props} />,
  summary: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <summary className={cn("*:select-none select-none cursor-pointer", className)} {...props} />,
  pre: ({
    className,
    __rawString__,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
    __withMeta__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
  } & NpmCommands) => {
    const isCommand = __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__;
    if (isCommand) return <CodeBlockCommand {...{ __npmCommand__, __yarnCommand__, __pnpmCommand__, __bunCommand__ }} />;
    return (
      <>
        <pre className={cn("peer mb-4 mt-6 !bg-transparent !bg-none", className)} {...props} />
        {__rawString__ && (
          <CopyButton
            value={__rawString__}
            aria-label="copy"
            title="copy code"
            className={cn(
              "absolute right-1 top-0.5 shadow bg-transparent opacity-0 transition-all duration-300 peer-hover:opacity-100 peer-hover:pointer-events-auto",
              __withMeta__ && "top-16"
            )}
          />
        )}
      </>
    );
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => <code dir="ltr" {...props} />,
  GradientLine: () => (
    <div className="mx-auto w-full max-w-full relative flex flex-col items-center justify-center text-center overflow-visible">
      <div className="w-full relative flex flex-col items-center justify-center">
        <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
        <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
        <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2 blur-sm" />
        <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2" />
        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)]" />
      </div>
      <span className="absolute -z-[1] backdrop-blur-sm inset-0 w-full h-full flex before:content-[''] before:h-3/4 before:w-full before:bg-gradient-to-r before:from-black before:to-purple-600 before:blur-[90px] after:content-[''] after:h-1/2 after:w-full after:bg-gradient-to-br after:from-cyan-400 after:to-sky-300 after:blur-[90px]" />
    </div>
  )
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code, {});

  return (
    <div className="mdx_customizer">
      <Component components={components} />
    </div>
  );
}
