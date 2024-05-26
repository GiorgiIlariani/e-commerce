/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nika2004.pythonanywhere.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "16.16.253.75",
        port: "",
      },
    ],
  },
};

export default nextConfig;
