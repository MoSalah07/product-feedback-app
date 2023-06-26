/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "/public/assets/80356355_2081113765367230_4747568849413472256_n.jpg",
      "t2.gstatic.com",
    ],
  },
};

module.exports = nextConfig;
