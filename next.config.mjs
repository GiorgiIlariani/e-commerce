/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nikamdinaradze.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "nikamdinaradze.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
