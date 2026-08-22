export type AdSlotType = 
  | "leaderboard"     // 728x90 (Desktop) / 320x50 (Mobile)
  | "large-rectangle" // 336x280 or 300x250
  | "in-feed"         // Responsive horizontal banner
  | "sidebar-sticky"  // 300x600 or 300x250
  | "responsive";     // Auto fluid unit

export interface AdPlacementConfig {
  slotType: AdSlotType;
  slotId?: string;
  minHeight: string;
  maxHeight?: string;
  width?: string;
  label: string;
  description: string;
}

export const AD_PLACEMENTS: Record<AdSlotType, AdPlacementConfig> = {
  leaderboard: {
    slotType: "leaderboard",
    minHeight: "min-h-[90px]",
    width: "w-full max-w-[728px]",
    label: "Top Leaderboard Ad (728x90 / 320x50)",
    description: "Displayed below main page header or above the tool container.",
  },
  "large-rectangle": {
    slotType: "large-rectangle",
    minHeight: "min-h-[280px]",
    width: "w-full max-w-[336px]",
    label: "Content Rectangle (336x280)",
    description: "Placed adjacent to tool results or mid-article.",
  },
  "in-feed": {
    slotType: "in-feed",
    minHeight: "min-h-[120px]",
    width: "w-full",
    label: "Native In-Feed Ad (Responsive)",
    description: "Separates the interactive tool output from the deep technical guide.",
  },
  "sidebar-sticky": {
    slotType: "sidebar-sticky",
    minHeight: "min-h-[600px]",
    width: "w-[300px]",
    label: "Sticky Sidebar Rail (300x600)",
    description: "Desktop sticky sidebar ad beside long-form educational guides.",
  },
  responsive: {
    slotType: "responsive",
    minHeight: "min-h-[100px]",
    width: "w-full",
    label: "Responsive Fluid Ad",
    description: "Auto-sizing AdSense placement.",
  },
};
