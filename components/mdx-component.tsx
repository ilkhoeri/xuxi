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
        "relative isolate my-8 flex flex-row items-center rounded-xl bg-background-box py-6 pl-12 pr-4 [unicode-bidi:isolate] before:absolute before:left-6 before:z-[10] before:h-4/5 before:w-1 before:bg-[#202425] before:content-['']",
        className
      )}
      {...props}
    />
  ),
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
        <pre className={cn("mb-4 mt-6 !bg-transparent !bg-none", className)} {...props} />
        {__rawString__ && <CopyButton value={__rawString__} className={cn("absolute right-1 top-1 shadow", __withMeta__ && "top-16")} />}
      </>
    );
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => <code dir="ltr" {...props} />
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
