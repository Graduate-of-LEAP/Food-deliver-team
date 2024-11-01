/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // domains: ["res.cloudinary.com"],
  },
  env: {
    customKey: "my-value",
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    ABLY_KEY: process.env.ABLY_KEY || "",
  },
};

export default nextConfig;
