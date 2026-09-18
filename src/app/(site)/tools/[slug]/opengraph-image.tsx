import { ImageResponse } from "next/og";
import { getProgrammaticToolBySlug } from "@/config/tools-registry";
import { getCategoryBySlug } from "@/config/categories";

export const runtime = "edge";

export const alt = "OmniSEO Tools - Free High-Performance SEO & Developer Utility";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function formatSlug(slug: string): string {
  if (!slug) return "SEO Tool";
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
  const tool = getProgrammaticToolBySlug(slug);

  const toolTitle = tool?.name || formatSlug(slug);
  const categoryDef = tool?.category ? getCategoryBySlug(tool.category) : undefined;
  const categoryName = categoryDef?.name || (tool?.category ? formatSlug(tool.category) : "Technical SEO");
  const description =
    tool?.tagline ||
    tool?.shortDescription ||
    "Free, client-side utility for web developers, SEO specialists, and digital marketers.";

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
          backgroundImage: "linear-gradient(135deg, #020617 0%, #0B0F19 50%, #111827 100%)",
          color: "#F8FAFC",
        }}
      >
        {/* 1. Header: Branding & Category Badge */}
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
              OmniSEO<span style={{ color: "#818CF8", marginLeft: 3 }}>Tools</span>
            </div>
          </div>

          {/* Category Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(129, 140, 248, 0.35)",
              color: "#C7D2FE",
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
            <span>{categoryName}</span>
          </div>
        </div>

        {/* 2. Center: Tool Title & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {/* Engine Status Badge */}
          {tool?.badge ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                color: "#34D399",
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
              <span>{tool.badge} — 2026 Engine</span>
            </div>
          ) : null}

          {/* Dynamic Tool Title */}
          <div
            style={{
              fontSize: toolTitle.length > 30 ? 46 : 54,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: 16,
              display: "flex",
            }}
          >
            {toolTitle}
          </div>

          {/* Tagline / Description */}
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: "#94A3B8",
              maxWidth: 960,
              display: "flex",
            }}
          >
            {description}
          </div>
        </div>

        {/* 3. Footer: Value Prop Badges & Domain */}
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
          {/* Value Prop Micro-Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 15,
              fontWeight: 700,
              color: "#A5B4FC",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(99, 102, 241, 0.12)",
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 8,
                border: "1px solid rgba(99, 102, 241, 0.2)",
                marginRight: 16,
              }}
            >
              <span style={{ color: "#34D399", marginRight: 6 }}>✓</span>
              <span>100% Client-Side</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(99, 102, 241, 0.12)",
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 8,
                border: "1px solid rgba(99, 102, 241, 0.2)",
                marginRight: 16,
              }}
            >
              <span style={{ color: "#FBBF24", marginRight: 6 }}>⚡</span>
              <span>Zero Latency</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(99, 102, 241, 0.12)",
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 8,
                border: "1px solid rgba(99, 102, 241, 0.2)",
              }}
            >
              <span style={{ color: "#818CF8", marginRight: 6 }}>🛠</span>
              <span>Developer Utility</span>
            </div>
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
            omniseotools.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
