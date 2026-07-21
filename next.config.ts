import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
