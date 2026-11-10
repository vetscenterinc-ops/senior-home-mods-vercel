/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Android emulator reaches this computer's dev server at 10.0.2.2.
  allowedDevOrigins: ['10.0.2.2'],
};

export default nextConfig;
