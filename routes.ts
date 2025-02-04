import { CommandIcon, BrandDiscordFillIcon, BrandGithubFillIcon, HeartIcon } from "@/ui/icons";

export type InnerRoutes = { title: string; href: string };
export type SingleRoute = { title: string; href?: string; data: InnerRoutes[] };
export type NestedRoute = { title: string; href?: string; data: SingleRoute[] };

export const ROUTES = {
  services: [
    {
      title: "Component",
      href: "https://oeri.vercel.app"
    }
  ],
  docsHead: [
    { title: "Table of Contents", href: "/toc" },
    { title: "Getting Started", href: "/started" },
    { title: "Installation", href: "/installation" }
  ] as InnerRoutes[],
  docs: [
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
    // {
    //   title: "About",
    //   href: "/about",
    //   data: [{ title: "About app", href: "/about/app" }]
    // }
  ] as SingleRoute[],
  sections: [
    {
      label: "Github Repository",
      href: "https://github.com/ilkhoeri/cretex",
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

export const tocList = [...ROUTES["docsHead"].map(d => d.href), ...ROUTES["docs"].flatMap(d => d.data.map(item => item.href))]
  .map(href => href.slice(1)) // Menghapus karakter "/" di awal
  .filter(href => href !== "toc"); // Mengecualikan "toc"

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
