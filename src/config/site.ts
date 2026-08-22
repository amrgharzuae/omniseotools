export const siteConfig = {
  name: "OmniSEOTools",
  shortName: "OmniSEO",
  description: "Free, lightning-fast utility tools for SEO specialists, digital marketers, developers, and creators.",
  url: "https://omniseotools.com",
  ogImage: "https://omniseotools.com/og.png",
  creator: "OmniSEOTools Team",
  links: {
    twitter: "https://twitter.com/omniseotools",
    github: "https://github.com/omniseotools",
  },
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-XXXXXXXXXXXXXXXX",
    enabled: process.env.NODE_ENV === "production" && !!process.env.NEXT_PUBLIC_ADSENSE_PUB_ID,
    testMode: process.env.NODE_ENV !== "production",
  },
  navigation: [
    { name: "All Tools", href: "/#tools" },
    { name: "SEO Tools", href: "/tools/seo" },
    { name: "Marketing", href: "/tools/marketing" },
    { name: "Developer", href: "/tools/developer" },
    { name: "Social Media", href: "/tools/social" },
  ],
};
