import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // experimental: { appDir: true },
  output: "export", // Enable static export
  trailingSlash: true, // Recommended for GitHub Pages
  // If you have dynamic routes, you might need to specify them
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
      "/ocx": { page: "/ocx" },
      "/cvx": { page: "/cvx" },
      "/cnx": { page: "/cnx" },
      "/clean": { page: "/clean" },
      "/links": { page: "/links" },
      "/license": { page: "/license" },
      "/changelog": { page: "/changelog" },
      "/coc": { page: "/coc" },
      "/others": { page: "/others" },
      "/about": { page: "/about" },
      "/about/app": { page: "/about/app" },
      "/_not-found": { page: "/_not-found" }
    };
  }
};

export default withContentlayer(nextConfig);
