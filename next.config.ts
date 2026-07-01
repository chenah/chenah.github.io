import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export so the site can still deploy to GitHub Pages.
  // (For a user page like <name>.github.io no basePath is needed. For a
  // project page, set basePath/assetPrefix to "/<repo-name>".)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
