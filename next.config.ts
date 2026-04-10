import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GARDEN_API_URL: process.env.GARDEN_API_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PRICE_DUNE: process.env.STRIPE_PRICE_DUNE,
  },
};

export default nextConfig;
