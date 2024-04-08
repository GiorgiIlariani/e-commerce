/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "16.16.253.75",
        port: "",
        pathname: "/",
      },
    ],
  },
};

export default nextConfig;
