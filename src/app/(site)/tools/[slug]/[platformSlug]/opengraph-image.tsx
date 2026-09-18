import { ImageResponse } from "next/og";
import { getProgrammaticToolBySlug } from "@/config/tools-registry";
import { getPlatformBySlug, getPlatformToolContent } from "@/config/platforms-registry";

export const runtime = "edge";

export const alt = "OmniSEO Tools - Platform-Optimized SEO & Developer Utility";
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
  params: Promise<{ slug: string; platformSlug: string }>;
}) {
  const { slug, platformSlug } = await params;
  const tool = getProgrammaticToolBySlug(slug);
  const platform = getPlatformBySlug(platformSlug);

  const toolTitle = tool?.name || formatSlug(slug);
  const platformName = platform?.name || formatSlug(platformSlug);
  const content = getPlatformToolContent(slug, platformSlug);

  const tagline =
    content?.tagline ||
    `Test, preview, and generate exact ${platformName}-optimized tags with real-time 2026 validation.`;

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
        {/* 1. Header: Site Branding & Integration Badge */}
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
            {/* Glowing Indicator Dot */}
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

          {/* Integration Hub Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(167, 139, 250, 0.35)",
              color: "#DDD6FE",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 18,
              paddingRight: 18,
              borderRadius: 20,
            }}
          >
            <span>Platform Integration</span>
          </div>
        </div>

        {/* 2. Main Center Body: Dual-Badge & Platform-Optimized Tool Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          {/* Dual Badges Row: Platform Pill + Tool Category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              marginBottom: 18,
            }}
          >
            {/* Prominent Platform Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(79, 70, 229, 0.25)",
                border: "1.5px solid #6366F1",
                color: "#C7D2FE",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: "0.02em",
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 18,
                paddingRight: 18,
                borderRadius: 10,
                marginRight: 12,
              }}
            >
              <span style={{ marginRight: 6 }}>⚡</span>
              <span>Optimized for {platformName}</span>
            </div>

            {platform?.badge ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  color: "#34D399",
                  fontSize: 13,
                  fontWeight: 700,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 14,
                  paddingRight: 14,
                  borderRadius: 8,
                }}
              >
                <span>{platform.badge}</span>
              </div>
            ) : null}
          </div>

          {/* Prominent Tool Title */}
          <div
            style={{
              fontSize: toolTitle.length > 25 ? 44 : 52,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: 16,
              display: "flex",
            }}
          >
            {toolTitle} for {platformName}
          </div>

          {/* Platform Specific Tagline / Snippet Preview Hint */}
          <div
            style={{
              fontSize: 21,
              lineHeight: 1.45,
              color: "#94A3B8",
              maxWidth: 960,
              display: "flex",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* 3. Footer: Value Prop Tags & Permutation Route */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 22,
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
              <span style={{ color: "#818CF8", marginRight: 6 }}>📋</span>
              <span>Copy-Ready Code</span>
            </div>
          </div>

          {/* Route Stamp */}
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#64748B",
              display: "flex",
            }}
          >
            omniseotools.com/tools/{slug}/{platformSlug}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
