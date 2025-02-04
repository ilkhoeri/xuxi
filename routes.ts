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
  docs: [
    {
      title: "Usage",
      href: "/ocx",
      data: [
        { title: "ocx", href: "/ocx" },
        { title: "cvx", href: "/cvx" },
        { title: "cnx", href: "/cnx" },
        { title: "clean", href: "/clean" },
        { title: "links", href: "/links" },
        { title: "license", href: "/license" },
        { title: "changelog", href: "/changelog" },
        { title: "Code of Conduct", href: "/coc" },
        { title: "others", href: "/others" }
      ]
    }
    // {
    //   title: "About",
    //   href: "/about",
    //   data: [{ title: "About app", href: "/about/app" }]
    // }
  ] as SingleRoute[],
  docsHead: [
    { title: "Table of Contents", href: "/toc" },
    { title: "Getting Started", href: "/started" },
    { title: "Installation", href: "/installation" }
  ] as InnerRoutes[],
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
