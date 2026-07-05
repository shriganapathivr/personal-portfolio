/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — deployable on Netlify/Vercel with no server.
  output: "export",
  // next/image optimization needs a server; disable for static export.
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
