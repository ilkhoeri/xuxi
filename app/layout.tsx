import { bodyConfig } from "./fonts";
import { NavHead } from "@/ui/navhead";
import { NavFoot } from "@/ui/navfoot";
import { NavProvider } from "@/ui/nav-ctx";
import { ThemeProvider } from "@/ui/config/themes";
import { AppProvider } from "@/ui/config/app-context";
import { META_THEME_COLORS, SEO_VERIFICATION, siteConfig, iconsConfig, linksConfig } from "./site/config";

import type { Metadata } from "next";

import "./globals.css";

export function metadata(): Metadata {
  return {
    title: {
      template: "%s | Cretex",
      default: siteConfig.name
    },
    applicationName: siteConfig.name,
    description: siteConfig.description,
    category: "Documentation",
    // manifest: "/manifest.json",
    generator: siteConfig.name,
    publisher: siteConfig.name,
    referrer: "origin-when-cross-origin",
    keywords: [...siteConfig.keywords],
    creator: siteConfig.creator,
    authors: [{ name: siteConfig.creator }, { name: siteConfig.creator, url: siteConfig.links.github }],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: "/assets/images/screenshoot-app.webp",
          width: 1200,
          height: 630
        }
      ],
      locale: "en_US",
      type: "website"
    },
    alternates: {
      canonical: "/",
      languages: {
        id: "/",
        en: "/en",
        ar: "/ar",
        ja: "/ja",
        jv: "/jv",
        ms: "/ms",
        th: "/th"
      }
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    ...iconsConfig,
    ...linksConfig,
    // SEO verification
    ...SEO_VERIFICATION,
    // archives
    archives: [...siteConfig.archives],
    other: {
      hostname: siteConfig.url,
      "expected-hostname": siteConfig.url,
      "msapplication-config": "/browserconfig.xml",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": siteConfig.name,
      "format-detection": "telephone=no",
      "msapplication-TileColor": "#ffffff",
      "msapplication-TileImage": "/favicon/ms-icon-144x144.png",
      "msapplication-tap-highlight": "no"
    }
  };
}

export const viewport = {
  minimumScale: 1,
  maximumScale: 1,
  initialScale: 1,
  userScalable: true,
  width: "device-width",
  height: "device-height",
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppProvider>
      <head>
        <link rel="icon" sizes="any" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body {...bodyConfig()}>
        <ThemeProvider>
          <NavProvider>
            <NavHead />
            {children}
            <NavFoot />
          </NavProvider>
        </ThemeProvider>
      </body>
    </AppProvider>
  );
}
