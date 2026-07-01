import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export, deployed to GitHub Pages as a user page
  // (chenah.github.io) — no basePath needed since it serves from the root.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
