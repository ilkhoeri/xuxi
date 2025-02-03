import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";
import { generateRoutes, ROUTES } from "./routes";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // experimental: {
  //   // appDir: true,
  // },
  output: "export", // Enable static export
  trailingSlash: true, // Recommended for GitHub Pages
  // If you have dynamic routes, you might need to specify them
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // return {
    //   "/": { page: "/" },
    //   "/ocx": { page: "/ocx" },
    //   // dan seterusnya ...
    //   "/about": { page: "/about" },
    //   "/about/app": { page: "/about/app" }
    // };
    return generateRoutes(ROUTES["docs"]);
  }
};

export default withContentlayer(nextConfig);
