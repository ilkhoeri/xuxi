import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true
};

export default withContentlayer(nextConfig);
