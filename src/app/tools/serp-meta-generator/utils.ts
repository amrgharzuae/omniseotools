export * from "@/lib/serp-utils";

export type StatusLevel = "pass" | "warning" | "critical";

export function getTitleStatus(pixelWidth: number, maxPx = 600): { level: StatusLevel; label: string } {
  if (pixelWidth === 0) return { level: "warning", label: "Empty" };
  if (pixelWidth > maxPx) return { level: "critical", label: "Truncated" };
  if (pixelWidth >= 400) return { level: "pass", label: "Optimal" };
  return { level: "warning", label: "Too Short" };
}

export function getDescStatus(pixelWidth: number, maxPx = 960): { level: StatusLevel; label: string } {
  if (pixelWidth === 0) return { level: "warning", label: "Empty" };
  if (pixelWidth > maxPx) return { level: "critical", label: "Truncated" };
  if (pixelWidth >= 500) return { level: "pass", label: "Optimal" };
  return { level: "warning", label: "Too Short" };
}
