import { CommandIcon, BrandDiscordFillIcon, BrandGithubFillIcon, HeartIcon } from "@/ui/icons";

export type InnerRoutes = { title: string; href: string };
export type SingleRoute = { title: string; href?: string; data: InnerRoutes[] };
export type NestedRoute = { title: string; href?: string; data: SingleRoute[] };

export const ROUTES = {
  services: [] as InnerRoutes[],
  docs: [
    { title: "Table of Contents", href: "/toc" },
    { title: "Getting Started", href: "/started" },
    { title: "Installation", href: "/installation" },
    {
      title: "Usage",
      href: "/ocx",
      data: [
        { title: "ocx", href: "/ocx" },
        { title: "cvx", href: "/cvx" },
        { title: "cnx", href: "/cnx" },
        { title: "clean", href: "/clean" },
        { title: "types", href: "/types" }
      ]
    },
    {
      title: "Meta",
      href: "/meta",
      data: [
        { title: "exported", href: "/exported" },
        { title: "license", href: "/license" },
        { title: "changelog", href: "/changelog" },
        { title: "Code of Conduct", href: "/coc" },
        { title: "links", href: "/links" }
      ]
    }
  ] as (InnerRoutes | SingleRoute | NestedRoute)[],
  sections: [
    {
      label: "Github Repository",
      href: "https://github.com/ilkhoeri/xuxi",
      icon: BrandGithubFillIcon,
      color: "#6e5494"
    },
    {
      label: "Discord Community",
      href: "https://discord.gg/Xct5BBPDZ9",
      icon: BrandDiscordFillIcon,
      color: "#436ab2"
    },
    {
      label: "Sponsor",
      href: "https://github.com/sponsors/ilkhoeri",
      icon: HeartIcon,
      color: "#b11c66"
    }
  ],
  suggestions: {
    title: "Main",
    data: [
      {
        title: "Getting Started",
        href: "/",
        icon: CommandIcon
      }
    ]
  },
  footRoutes: [] as InnerRoutes[]
};

// Mengambil semua href dari docs secara rekursif
function extractHrefs(routes: (InnerRoutes | SingleRoute | NestedRoute)[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  const traverse = (items: (InnerRoutes | SingleRoute | NestedRoute)[]) => {
    for (const item of items) {
      if (item.href) {
        const cleanHref = item.href.slice(1); // Hilangkan "/" di awal
        if (!seen.has(cleanHref)) {
          seen.add(cleanHref);
          result.push(cleanHref);
        }
      }
      if ("data" in item) {
        traverse(item.data); // Rekursi ke dalam `data`
      }
    }
  };

  traverse(routes);
  return result;
}

export const tocList = extractHrefs(ROUTES["docs"]).filter(href => href !== "toc");

type RouteMap = Record<string, { page: string }>;

export const generateRoutes = (routes: SingleRoute[]): RouteMap => {
  return routes.reduce<RouteMap>((acc, { href, data }) => {
    acc[href || ""] = { page: href || "" };
    if (data) {
      // @ts-ignore
      Object.assign(acc, generateRoutes(data));
    }
    return acc;
  }, {});
};
