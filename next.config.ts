import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
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
