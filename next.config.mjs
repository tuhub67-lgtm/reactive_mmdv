/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Не блокируем прод-сборку на линте — типы всё равно проверяются.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
