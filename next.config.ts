import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // experimental: {
  //   // appDir: true,
  // },
  output: "export", // Enable static export
  trailingSlash: true // Recommended for GitHub Pages
  // If you have dynamic routes, you might need to specify them
  // exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
  //   return {
  //     "": { page: "" },
  //     "/about": { page: "/about" },
  //     "/contact": { page: "/contact" }
  //     // Add all your known routes
  //   };
  //   // return allDocs.map(doc => ({ [`/${doc._raw.flattenedPath}`]: { page: `/${doc._raw.flattenedPath}` } }));
  // }
};

export default withContentlayer(nextConfig);
