/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/tools/utm-builder",
        destination: "/tools/utm-campaign-builder",
        permanent: true,
      },
      {
        source: "/tools/campaign-utm-builder",
        destination: "/tools/utm-campaign-builder",
        permanent: true,
      },
      {
        source: "/tools/marketing/utm-campaign-builder",
        destination: "/tools/utm-campaign-builder",
        permanent: true,
      },
      {
        source: "/tools/marketing/utm-campaign-builder/:platform",
        destination: "/tools/utm-campaign-builder/:platform",
        permanent: true,
      },
      {
        source: "/tools/twitter-card-previewer",
        destination: "/tools/twitter-card-preview",
        permanent: true,
      },
      {
        source: "/tools/serp-simulator",
        destination: "/tools/google-serp-simulator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
