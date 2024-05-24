/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nika2004.pythonanywhere.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
