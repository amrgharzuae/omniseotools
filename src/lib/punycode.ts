/**
 * RFC 3492 / RFC 5891 Punycode & IDN Conversion Engine
 * Pure client-side implementation with zero external dependencies.
 */

// RFC 3492 Parameters
const BASE = 36;
const TMIN = 1;
const TMAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128; // 0x80
const DELIMITER = "-";
const ACE_PREFIX = "xn--";

/**
 * Bias adaptation function as specified in RFC 3492 section 3.4
 */
function adapt(delta: number, numpoints: number, firsttime: boolean): number {
  let k = 0;
  delta = firsttime ? Math.floor(delta / DAMP) : delta >> 1;
  delta += Math.floor(delta / numpoints);
  while (delta > ((BASE - TMIN) * TMAX) >> 1) {
    delta = Math.floor(delta / (BASE - TMIN));
    k += BASE;
  }
  return k + Math.floor(((BASE - TMIN + 1) * delta) / (delta + SKEW));
}

/**
 * Converts a digit (0..35) to a basic ASCII character ('a'..'z', '0'..'9')
 */
function digitToBasic(digit: number): string {
  return String.fromCharCode(digit + 22 + 75 * (digit < 26 ? 1 : 0));
}

/**
 * Converts a basic ASCII character to its digit value (0..35)
 */
function basicToDigit(codePoint: number): number {
  if (codePoint - 48 < 10) return codePoint - 22; // 0-9 -> 26-35
  if (codePoint - 65 < 26) return codePoint - 65; // A-Z -> 0-25
  if (codePoint - 97 < 26) return codePoint - 97; // a-z -> 0-25
  return BASE;
}

/**
 * Converts a JS string into an array of UTF-32 code points, properly handling surrogate pairs (e.g. emojis)
 */
export function ucs2decode(str: string): number[] {
  const output: number[] = [];
  let counter = 0;
  const length = str.length;
  while (counter < length) {
    const value = str.charCodeAt(counter++);
    if (value >= 0xd800 && value <= 0xdbff && counter < length) {
      // High surrogate, check for low surrogate
      const extra = str.charCodeAt(counter++);
      if ((extra & 0xfc00) === 0xdc00) {
        output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

/**
 * Converts an array of UTF-32 code points back into a JavaScript UTF-16 string
 */
export function ucs2encode(codePoints: number[]): string {
  return String.fromCodePoint(...codePoints);
}

/**
 * Encodes a single Unicode label into Punycode (without the xn-- prefix)
 */
export function encodeLabel(input: string): string {
  const inputCodePoints = ucs2decode(input);
  const inputLength = inputCodePoints.length;

  let n = INITIAL_N;
  let delta = 0;
  let bias = INITIAL_BIAS;
  const output: string[] = [];

  // Copy basic code points
  for (const codePoint of inputCodePoints) {
    if (codePoint < 0x80) {
      output.push(String.fromCharCode(codePoint));
    }
  }

  const basicLength = output.length;
  let handledCodePointCount = basicLength;

  if (basicLength > 0) {
    output.push(DELIMITER);
  }

  while (handledCodePointCount < inputLength) {
    // Find smallest non-basic code point >= n
    let m = 0x7fffffff;
    for (const codePoint of inputCodePoints) {
      if (codePoint >= n && codePoint < m) {
        m = codePoint;
      }
    }

    delta += (m - n) * (handledCodePointCount + 1);
    n = m;

    for (const codePoint of inputCodePoints) {
      if (codePoint < n) {
        delta++;
      } else if (codePoint === n) {
        let q = delta;
        for (let k = BASE; ; k += BASE) {
          const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
          if (q < t) break;
          const qMinusT = q - t;
          const baseMinusT = BASE - t;
          output.push(digitToBasic(t + (qMinusT % baseMinusT)));
          q = Math.floor(qMinusT / baseMinusT);
        }
        output.push(digitToBasic(q));
        bias = adapt(delta, handledCodePointCount + 1, handledCodePointCount === basicLength);
        delta = 0;
        handledCodePointCount++;
      }
    }
    delta++;
    n++;
  }

  return output.join("");
}

/**
 * Decodes a single Punycode label (without the xn-- prefix) back into a Unicode string
 */
export function decodeLabel(input: string): string {
  const output: number[] = [];
  const inputLength = input.length;
  let n = INITIAL_N;
  let i = 0;
  let bias = INITIAL_BIAS;

  let basic = input.lastIndexOf(DELIMITER);
  if (basic < 0) {
    basic = 0;
  }

  for (let j = 0; j < basic; ++j) {
    const codePoint = input.charCodeAt(j);
    if (codePoint >= 0x80) {
      throw new RangeError("Illegal non-ASCII character in punycode input");
    }
    output.push(codePoint);
  }

  let index = basic > 0 ? basic + 1 : 0;
  while (index < inputLength) {
    const oldi = i;
    let w = 1;
    for (let k = BASE; ; k += BASE) {
      if (index >= inputLength) {
        throw new RangeError("Invalid punycode stream length");
      }
      const digit = basicToDigit(input.charCodeAt(index++));
      if (digit >= BASE) {
        throw new RangeError("Invalid punycode character detected");
      }
      i += digit * w;
      const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
      if (digit < t) break;
      w *= BASE - t;
    }

    const outLength = output.length + 1;
    bias = adapt(i - oldi, outLength, oldi === 0);
    n += Math.floor(i / outLength);
    i %= outLength;

    output.splice(i, 0, n);
    i++;
  }

  return ucs2encode(output);
}

/**
 * Converts a domain label to ASCII ACE format (e.g. münchen -> xn--mnchen-3ya)
 */
export function labelToASCII(label: string): string {
  // If label contains only ASCII (and no non-ASCII characters), return as-is
  if (/^[\x00-\x7F]*$/.test(label)) {
    return label;
  }
  return ACE_PREFIX + encodeLabel(label);
}

/**
 * Converts an ASCII ACE label back to Unicode (e.g. xn--mnchen-3ya -> münchen)
 */
export function labelToUnicode(label: string): string {
  if (label.toLowerCase().startsWith(ACE_PREFIX)) {
    try {
      return decodeLabel(label.slice(4));
    } catch {
      return label;
    }
  }
  return label;
}

// Regex matching domain separators (standard dot and unicode fullwidth dots)
const DOMAIN_SEPARATORS_REGEX = /[\.\u3002\uFF0E\uFF61]/g;

/**
 * Splits a hostname by standard and fullwidth dot characters
 */
export function splitDomainLabels(hostname: string): string[] {
  return hostname.replace(DOMAIN_SEPARATORS_REGEX, ".").split(".");
}

export interface ParsedTarget {
  raw: string;
  isUrl: boolean;
  isEmail: boolean;
  protocol: string; // e.g., "https://" or ""
  auth: string; // e.g., "user:pass@" or ""
  emailPrefix: string; // e.g., "admin@" or ""
  hostname: string; // e.g., "موقع.امارات"
  port: string; // e.g., ":8080" or ""
  pathname: string; // e.g., "/blog/post-1" or ""
  search: string; // e.g., "?ref=test" or ""
  hash: string; // e.g., "#section" or ""
}

/**
 * Parses an input string (domain, URL, or email address) into structured components
 */
export function parseDomainOrUrl(input: string): ParsedTarget {
  const trimmed = input.trim();

  // 1. Email check: user@domain.tld
  if (!trimmed.includes("://") && trimmed.includes("@")) {
    const atIndex = trimmed.lastIndexOf("@");
    return {
      raw: trimmed,
      isUrl: false,
      isEmail: true,
      protocol: "",
      auth: "",
      emailPrefix: trimmed.slice(0, atIndex + 1),
      hostname: trimmed.slice(atIndex + 1),
      port: "",
      pathname: "",
      search: "",
      hash: "",
    };
  }

  // 2. URL check: starts with protocol or has path/query
  let protocol = "";
  let working = trimmed;

  const protocolMatch = working.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:\/\/)(.*)$/);
  if (protocolMatch) {
    protocol = protocolMatch[1];
    working = protocolMatch[2];
  }

  // Check for user:pass@
  let auth = "";
  const atIndex = working.indexOf("@");
  if (atIndex !== -1 && !working.slice(0, atIndex).includes("/")) {
    auth = working.slice(0, atIndex + 1);
    working = working.slice(atIndex + 1);
  }

  // Split path, query, hash
  let pathname = "";
  let search = "";
  let hash = "";

  const hashIndex = working.indexOf("#");
  if (hashIndex !== -1) {
    hash = working.slice(hashIndex);
    working = working.slice(0, hashIndex);
  }

  const queryIndex = working.indexOf("?");
  if (queryIndex !== -1) {
    search = working.slice(queryIndex);
    working = working.slice(0, queryIndex);
  }

  const slashIndex = working.indexOf("/");
  if (slashIndex !== -1) {
    pathname = working.slice(slashIndex);
    working = working.slice(0, slashIndex);
  }

  // Check for port in hostname (e.g. localhost:3000 or domain.com:8080)
  let port = "";
  const portMatch = working.match(/^(.*?)(:[0-9]+)$/);
  if (portMatch) {
    working = portMatch[1];
    port = portMatch[2];
  }

  const isUrl = Boolean(protocol || pathname || search || hash || port);

  return {
    raw: trimmed,
    isUrl,
    isEmail: false,
    protocol,
    auth,
    emailPrefix: "",
    hostname: working,
    port,
    pathname,
    search,
    hash,
  };
}

/**
 * Converts a domain or URL to its ASCII / Punycode (xn--) equivalent
 */
export function toASCII(input: string): string {
  if (!input || !input.trim()) return "";
  const parsed = parseDomainOrUrl(input);

  const labels = splitDomainLabels(parsed.hostname);
  const asciiLabels = labels.map((l) => labelToASCII(l));
  const asciiHostname = asciiLabels.join(".");

  if (parsed.isEmail) {
    return `${parsed.emailPrefix}${asciiHostname}`;
  }

  return `${parsed.protocol}${parsed.auth}${asciiHostname}${parsed.port}${parsed.pathname}${parsed.search}${parsed.hash}`;
}

/**
 * Converts an ASCII / Punycode domain or URL back to its Unicode / Native script format
 */
export function toUnicode(input: string): string {
  if (!input || !input.trim()) return "";
  const parsed = parseDomainOrUrl(input);

  const labels = splitDomainLabels(parsed.hostname);
  const unicodeLabels = labels.map((l) => labelToUnicode(l));
  const unicodeHostname = unicodeLabels.join(".");

  if (parsed.isEmail) {
    return `${parsed.emailPrefix}${unicodeHostname}`;
  }

  return `${parsed.protocol}${parsed.auth}${unicodeHostname}${parsed.port}${parsed.pathname}${parsed.search}${parsed.hash}`;
}

/**
 * Detects if a string contains Punycode (xn--) labels
 */
export function isPunycode(input: string): boolean {
  return /xn--/i.test(input);
}

// -------------------------------------------------------------
// HOMOGRAPH & SCRIPT ANALYSIS ENGINE
// -------------------------------------------------------------

export type ScriptCategory =
  | "Latin"
  | "Cyrillic"
  | "Arabic"
  | "Greek"
  | "Hebrew"
  | "Han / CJK"
  | "Hiragana"
  | "Katakana"
  | "Hangul"
  | "Devanagari"
  | "Emoji / Symbol"
  | "Common / Number"
  | "Other Unicode";

export interface CharInspection {
  char: string;
  codePoint: number;
  hex: string;
  script: ScriptCategory;
  isConfusable: boolean;
  confusableNote?: string;
}

// Common Cyrillic & Greek homoglyphs with Latin characters
const CONFUSABLE_LOOKUP: Record<number, string> = {
  // Cyrillic Lowercase
  0x0430: "Cyrillic Small 'а' (looks like Latin 'a')",
  0x0441: "Cyrillic Small 'с' (looks like Latin 'c')",
  0x0434: "Cyrillic Small 'д' (looks like Latin 'g')",
  0x0435: "Cyrillic Small 'е' (looks like Latin 'e')",
  0x0456: "Cyrillic Small 'і' (looks like Latin 'i')",
  0x0458: "Cyrillic Small 'ј' (looks like Latin 'j')",
  0x043e: "Cyrillic Small 'о' (looks like Latin 'o')",
  0x0440: "Cyrillic Small 'р' (looks like Latin 'p')",
  0x0455: "Cyrillic Small 'ѕ' (looks like Latin 's')",
  0x0445: "Cyrillic Small 'х' (looks like Latin 'x')",
  0x0443: "Cyrillic Small 'у' (looks like Latin 'y')",
  // Cyrillic Uppercase
  0x0410: "Cyrillic Capital 'А' (looks like Latin 'A')",
  0x0412: "Cyrillic Capital 'В' (looks like Latin 'B')",
  0x0421: "Cyrillic Capital 'С' (looks like Latin 'C')",
  0x0415: "Cyrillic Capital 'Е' (looks like Latin 'E')",
  0x041d: "Cyrillic Capital 'Н' (looks like Latin 'H')",
  0x0406: "Cyrillic Capital 'І' (looks like Latin 'I')",
  0x0408: "Cyrillic Capital 'Ј' (looks like Latin 'J')",
  0x041a: "Cyrillic Capital 'К' (looks like Latin 'K')",
  0x041c: "Cyrillic Capital 'М' (looks like Latin 'M')",
  0x041e: "Cyrillic Capital 'О' (looks like Latin 'O')",
  0x0420: "Cyrillic Capital 'Р' (looks like Latin 'P')",
  0x0422: "Cyrillic Capital 'Т' (looks like Latin 'T')",
  0x0425: "Cyrillic Capital 'Х' (looks like Latin 'X')",
  // Greek
  0x03bf: "Greek Small 'ο' (looks like Latin 'o')",
  0x03bd: "Greek Small 'ν' (looks like Latin 'v')",
  0x03c1: "Greek Small 'ρ' (looks like Latin 'p')",
  0x0391: "Greek Capital 'Α' (looks like Latin 'A')",
  0x0392: "Greek Capital 'Β' (looks like Latin 'B')",
  0x0395: "Greek Capital 'Ε' (looks like Latin 'E')",
  0x0397: "Greek Capital 'Η' (looks like Latin 'H')",
  0x0399: "Greek Capital 'Ι' (looks like Latin 'I')",
  0x039a: "Greek Capital 'Κ' (looks like Latin 'K')",
  0x039c: "Greek Capital 'Μ' (looks like Latin 'M')",
  0x039d: "Greek Capital 'Ν' (looks like Latin 'N')",
  0x039f: "Greek Capital 'Ο' (looks like Latin 'O')",
  0x03a1: "Greek Capital 'Ρ' (looks like Latin 'P')",
  0x03a4: "Greek Capital 'Τ' (looks like Latin 'T')",
  0x03a7: "Greek Capital 'Χ' (looks like Latin 'X')",
  0x03a5: "Greek Capital 'Υ' (looks like Latin 'Y')",
  0x0396: "Greek Capital 'Ζ' (looks like Latin 'Z')",
};

/**
 * Classifies a Unicode code point into its primary Script Category
 */
export function getCodePointScript(cp: number): ScriptCategory {
  // ASCII / Basic Latin
  if ((cp >= 0x0041 && cp <= 0x005a) || (cp >= 0x0061 && cp <= 0x007a)) return "Latin";
  // Latin-1 Supplement / Extended
  if (
    (cp >= 0x00c0 && cp <= 0x024f) ||
    (cp >= 0x1e00 && cp <= 0x1eff) ||
    (cp >= 0x2c60 && cp <= 0x2c7f) ||
    (cp >= 0xa720 && cp <= 0xa7ff)
  ) {
    return "Latin";
  }

  // Cyrillic
  if (
    (cp >= 0x0400 && cp <= 0x04ff) ||
    (cp >= 0x0500 && cp <= 0x052f) ||
    (cp >= 0x2de0 && cp <= 0x2dff) ||
    (cp >= 0xa640 && cp <= 0xa69f)
  ) {
    return "Cyrillic";
  }

  // Arabic
  if (
    (cp >= 0x0600 && cp <= 0x06ff) ||
    (cp >= 0x0750 && cp <= 0x077f) ||
    (cp >= 0x08a0 && cp <= 0x08ff) ||
    (cp >= 0xfb50 && cp <= 0xfdff) ||
    (cp >= 0xfe70 && cp <= 0xfeff)
  ) {
    return "Arabic";
  }

  // Greek
  if ((cp >= 0x0370 && cp <= 0x03ff) || (cp >= 0x1f00 && cp <= 0x1fff)) {
    return "Greek";
  }

  // Hebrew
  if (cp >= 0x0590 && cp <= 0x05ff) {
    return "Hebrew";
  }

  // CJK / Han
  if (
    (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x20000 && cp <= 0x2a6df)
  ) {
    return "Han / CJK";
  }

  // Japanese Hiragana / Katakana
  if (cp >= 0x3040 && cp <= 0x309f) return "Hiragana";
  if (cp >= 0x30a0 && cp <= 0x30ff) return "Katakana";

  // Korean Hangul
  if (
    (cp >= 0xac00 && cp <= 0xd7af) ||
    (cp >= 0x1100 && cp <= 0x11ff) ||
    (cp >= 0x3130 && cp <= 0x318f)
  ) {
    return "Hangul";
  }

  // Devanagari
  if (cp >= 0x0900 && cp <= 0x097f) return "Devanagari";

  // Emojis / Symbols
  if (
    (cp >= 0x1f300 && cp <= 0x1faff) ||
    (cp >= 0x2600 && cp <= 0x27bf) ||
    (cp >= 0xfe00 && cp <= 0xfe0f) // Variation selectors
  ) {
    return "Emoji / Symbol";
  }

  // Common: Digits, hyphen, dots
  if ((cp >= 0x0030 && cp <= 0x0039) || cp === 0x002d || cp === 0x002e || cp === 0x005f) {
    return "Common / Number";
  }

  return "Other Unicode";
}

export interface SecurityAnalysis {
  riskLevel: "safe" | "warning" | "danger";
  riskTitle: string;
  riskDescription: string;
  detectedScripts: ScriptCategory[];
  hasMixedScripts: boolean;
  hasCyrillicLatinMix: boolean;
  hasGreekLatinMix: boolean;
  hasConfusables: boolean;
  confusableCount: number;
  characters: CharInspection[];
}

/**
 * Analyzes an IDN domain for homograph spoofing risks, mixed scripts, and confusables
 */
export function analyzeHomographRisk(domainOrUrl: string): SecurityAnalysis {
  const parsed = parseDomainOrUrl(domainOrUrl);
  const unicodeHost = toUnicode(parsed.hostname).toLowerCase();

  const codePoints = ucs2decode(unicodeHost);
  const scriptsSet = new Set<ScriptCategory>();
  const characters: CharInspection[] = [];

  let hasLatin = false;
  let hasCyrillic = false;
  let hasGreek = false;
  let confusableCount = 0;

  for (const cp of codePoints) {
    const script = getCodePointScript(cp);
    if (script !== "Common / Number") {
      scriptsSet.add(script);
    }

    if (script === "Latin") hasLatin = true;
    if (script === "Cyrillic") hasCyrillic = true;
    if (script === "Greek") hasGreek = true;

    const confusableNote = CONFUSABLE_LOOKUP[cp];
    const isConfusable = Boolean(confusableNote);
    if (isConfusable) confusableCount++;

    characters.push({
      char: String.fromCodePoint(cp),
      codePoint: cp,
      hex: `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`,
      script,
      isConfusable,
      confusableNote,
    });
  }

  const detectedScripts = Array.from(scriptsSet);
  const hasCyrillicLatinMix = hasLatin && hasCyrillic;
  const hasGreekLatinMix = hasLatin && hasGreek;
  const hasMixedScripts = detectedScripts.length > 1;

  let riskLevel: "safe" | "warning" | "danger" = "safe";
  let riskTitle = "Safe (Single Script)";
  let riskDescription = "Domain uses a consistent, single script with zero mixed-alphabet spoofing indicators.";

  if (hasCyrillicLatinMix || hasGreekLatinMix) {
    riskLevel = "danger";
    riskTitle = "High Risk: Mixed Script Homograph Attack";
    riskDescription =
      "This domain mixes Latin characters with visually identical Cyrillic or Greek glyphs. This is the primary signature of an IDN Homograph phishing attack.";
  } else if (hasMixedScripts) {
    riskLevel = "warning";
    riskTitle = "Medium Risk: Multi-Script Composition";
    riskDescription = `Domain contains multiple distinct scripts (${detectedScripts.join(", ")}). Verify whether this script mixing is intentional.`;
  }

  return {
    riskLevel,
    riskTitle,
    riskDescription,
    detectedScripts,
    hasMixedScripts,
    hasCyrillicLatinMix,
    hasGreekLatinMix,
    hasConfusables: confusableCount > 0,
    confusableCount,
    characters,
  };
}

// -------------------------------------------------------------
// DNS RFC COMPLIANCE & LENGTH VALIDATOR
// -------------------------------------------------------------

export interface DnsLabelDiagnostic {
  label: string;
  asciiLabel: string;
  byteLength: number;
  isValid: boolean;
  error?: string;
}

export interface DnsValidationResult {
  isValid: boolean;
  totalFqdnBytes: number;
  maxFqdnBytes: number; // 253 octets
  isFqdnLengthValid: boolean;
  labelsCount: number;
  labels: DnsLabelDiagnostic[];
  errors: string[];
  warnings: string[];
}

/**
 * Validates domain against RFC 1035 / RFC 5890 DNS specifications
 */
export function validateDnsCompliance(domainOrUrl: string): DnsValidationResult {
  const parsed = parseDomainOrUrl(domainOrUrl);
  const asciiHost = toASCII(parsed.hostname).toLowerCase();

  const labels = splitDomainLabels(asciiHost).filter(Boolean);
  const totalFqdnBytes = new TextEncoder().encode(asciiHost).length;
  const maxFqdnBytes = 253;
  const isFqdnLengthValid = totalFqdnBytes <= maxFqdnBytes;

  const errors: string[] = [];
  const warnings: string[] = [];
  const labelDiagnostics: DnsLabelDiagnostic[] = [];

  if (!isFqdnLengthValid) {
    errors.push(`Total FQDN length (${totalFqdnBytes} bytes) exceeds the RFC 1035 maximum limit of 253 bytes.`);
  }

  if (labels.length === 0) {
    errors.push("Domain name is empty.");
  }

  for (let idx = 0; idx < labels.length; idx++) {
    const asciiLabel = labels[idx];
    const byteLength = new TextEncoder().encode(asciiLabel).length;
    let labelValid = true;
    let labelError: string | undefined;

    if (byteLength > 63) {
      labelValid = false;
      labelError = `Label length (${byteLength} bytes) exceeds maximum DNS label limit of 63 bytes.`;
      errors.push(`Label #${idx + 1} "${asciiLabel}" is ${byteLength} bytes (max allowed is 63 bytes).`);
    }

    if (asciiLabel.startsWith("-") || asciiLabel.endsWith("-")) {
      labelValid = false;
      labelError = "Labels must not begin or end with a hyphen (-).";
      errors.push(`Label #${idx + 1} "${asciiLabel}" starts or ends with an invalid hyphen.`);
    }

    // Check for consecutive hyphens in positions 3 and 4 unless it is "xn--"
    if (
      asciiLabel.length >= 4 &&
      asciiLabel[2] === "-" &&
      asciiLabel[3] === "-" &&
      !asciiLabel.startsWith("xn--")
    ) {
      warnings.push(
        `Label #${idx + 1} "${asciiLabel}" contains '--' in 3rd and 4th positions, which is reserved for IDN extensions.`
      );
    }

    labelDiagnostics.push({
      label: toUnicode(asciiLabel),
      asciiLabel,
      byteLength,
      isValid: labelValid,
      error: labelError,
    });
  }

  return {
    isValid: errors.length === 0,
    totalFqdnBytes,
    maxFqdnBytes,
    isFqdnLengthValid,
    labelsCount: labels.length,
    labels: labelDiagnostics,
    errors,
    warnings,
  };
}
