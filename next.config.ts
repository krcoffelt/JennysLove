import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets local check builds use a separate folder so they don't clobber a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
