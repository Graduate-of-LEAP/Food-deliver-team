/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    customKey: "my-value",
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
  },
};

export default nextConfig;
