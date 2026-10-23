// Plain JS (not next.config.ts) on purpose: Hostinger's build server has an
// older glibc than Next's native SWC binary needs, so Next falls back to its
// WASM build there, and that fallback can't load a TypeScript config file.

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/formats/s-vhs",
        destination: "/formats/vhs",
        permanent: true,
      },
      {
        source: "/formats/hi8",
        destination: "/formats/hi8-video8",
        permanent: true,
      },
      {
        source: "/formats/video8",
        destination: "/formats/hi8-video8",
        permanent: true,
      },
      {
        source: "/formats/digital8",
        destination: "/formats/hi8-video8",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
