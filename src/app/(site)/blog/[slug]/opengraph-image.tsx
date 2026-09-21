import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "OmniSEO Tools Developer Guide & Engineering Article";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function formatSlug(slug: string): string {
  if (!slug) return "Engineering Guide";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleTitle = formatSlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          backgroundColor: "#020617",
          backgroundImage:
            "linear-gradient(135deg, #020617 0%, #0B0F19 50%, #111827 100%)",
          color: "#F8FAFC",
        }}
      >
        {/* 1. Header: Branding & Article Tag Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Site Branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Indicator Dot */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#10B981",
                marginRight: 12,
              }}
            />
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                display: "flex",
              }}
            >
              OmniSEO<span style={{ color: "#818CF8", marginLeft: 3 }}>Blog</span>
            </div>
          </div>

          {/* Tag Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#34D399",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
            }}
          >
            <span>Technical Guide</span>
          </div>
        </div>

        {/* 2. Center: Article Title & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(129, 140, 248, 0.35)",
              color: "#C7D2FE",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 6,
              marginBottom: 16,
            }}
          >
            <span>Engineering & Technical Specification</span>
          </div>

          {/* Dynamic Article Title */}
          <div
            style={{
              fontSize: articleTitle.length > 45 ? 42 : 50,
              fontWeight: 900,
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: 16,
              display: "flex",
            }}
          >
            {articleTitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              lineHeight: 1.4,
              color: "#94A3B8",
              maxWidth: 980,
              display: "flex",
            }}
          >
            In-depth engineering guide, best practices, and code examples from the OmniSEO Tools technical team.
          </div>
        </div>

        {/* 3. Footer: Attribution & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 24,
            borderTop: "1px solid rgba(148, 163, 184, 0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#A5B4FC",
            }}
          >
            <span>OmniSEO Tools Core Engineering</span>
          </div>

          {/* Domain */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#64748B",
              display: "flex",
            }}
          >
            omniseotools.com/blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
