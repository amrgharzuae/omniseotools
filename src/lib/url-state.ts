/**
 * Client-Side URL State Serialization Module
 *
 * Enables zero-latency, 100% client-side permalink sharing for metadata generator
 * and preview tools by compressing active form states into the URL hash fragment (#s=...).
 */

export interface ShareableMetaState {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  siteName?: string;
  twitterHandle?: string;
  cardType?: string;
  theme?: string;
}

/**
 * Encodes a shareable metadata state object into a URL hash fragment (#s=...).
 * Guards against SSR, strips empty string fields, and uses UTF-8 safe base64 encoding.
 */
export function encodeStateToHash(data: ShareableMetaState): string {
  if (typeof window === "undefined") return "";

  try {
    // Strip empty / undefined fields and trim values so payloads remain compact
    const cleaned: Record<string, string> = {};

    if (data.title && data.title.trim()) cleaned.title = data.title.trim();
    if (data.description && data.description.trim()) cleaned.description = data.description.trim();
    if (data.url && data.url.trim()) cleaned.url = data.url.trim();
    if (data.image && data.image.trim()) cleaned.image = data.image.trim();
    if (data.siteName && data.siteName.trim()) cleaned.siteName = data.siteName.trim();
    if (data.twitterHandle && data.twitterHandle.trim()) cleaned.twitterHandle = data.twitterHandle.trim();
    if (data.cardType && data.cardType.trim()) cleaned.cardType = data.cardType.trim();
    if (data.theme && data.theme.trim()) cleaned.theme = data.theme.trim();

    if (Object.keys(cleaned).length === 0) {
      return "";
    }

    const json = JSON.stringify(cleaned);
    // UTF-8 safe base64 encoding
    const encodedPayload = btoa(encodeURIComponent(json));
    return `#s=${encodedPayload}`;
  } catch (err: unknown) {
    console.error("Failed to encode state to hash:", err);
    return "";
  }
}

/**
 * Decodes a shareable metadata state object from a URL hash fragment (#s=...).
 * Guards against SSR, extracts payload after 's=', and parses UTF-8 base64 JSON.
 */
export function decodeStateFromHash(hashString?: string): ShareableMetaState | null {
  if (typeof window === "undefined") return null;

  try {
    const rawHash = hashString !== undefined ? hashString : window.location.hash;
    if (!rawHash) return null;

    const sIndex = rawHash.indexOf("s=");
    if (sIndex === -1) return null;

    const payload = rawHash.slice(sIndex + 2);
    if (!payload.trim()) return null;

    const json = decodeURIComponent(atob(payload.trim()));
    const parsed = JSON.parse(json);

    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as ShareableMetaState;
    }

    return null;
  } catch {
    // Silently return null for malformed or corrupted hashes
    return null;
  }
}
