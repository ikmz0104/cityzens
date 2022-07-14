/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/test/:slug', // 受信するリクエストのパスパターン
        destination: '/404', // ルーティングしたいパス
        permanent: true, // 永続的なリダイレクトかのフラグ(一時的なリダイレクトではないならtrue)
      },
    ];
  },
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['media.api-sports.io'],
  },
};