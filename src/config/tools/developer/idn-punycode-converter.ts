import { ToolDefinition } from "@/types/tool";

export const idnPunycodeConverterTool: ToolDefinition = {
  id: "idn-punycode-converter",
  slug: "idn-punycode-converter",
  name: "Unicode & Punycode (IDN) Converter",
  title: "Free Unicode & Punycode (IDN) Converter & Homograph Detector | OmniSEO",
  metaTitle: "Free Unicode & Punycode (IDN) Converter & Homograph Detector | OmniSEO",
  metaDescription:
    "Convert Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Punycode (xn--) and vice-versa. Includes DNS length and homograph security checks.",
  h1: "Unicode & Punycode (IDN) Converter & Homograph Detector",
  tagline:
    "Bidirectionally convert Internationalized Domain Names (IDNs) to ASCII Punycode (xn--) and inspect DNS length limits and homograph spoofing risks in real-time.",
  shortDescription:
    "Convert Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Punycode (xn--) and vice-versa. Includes DNS length and homograph security checks.",
  category: "developer",
  icon: "Globe",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "punycode converter",
    "idn converter",
    "unicode to punycode",
    "punycode to unicode",
    "idn punycode",
    "xn-- converter",
    "internationalized domain name",
    "arabic domain punycode",
    "emoji domain converter",
    "homograph attack detector",
    "dns label length checker",
    "rfc 3492 punycode",
  ],
  howToSteps: [
    {
      name: "Input Target Domain, URL, or Email",
      text: "Enter or paste your Internationalized Domain Name (e.g. münchen.de, موقع.امارات, or i❤️coding.ws) or raw ASCII Punycode (xn--...).",
    },
    {
      name: "Automatic Bidirectional Conversion",
      text: "The engine instantly converts Unicode native characters to ASCII Compatible Encoding (ACE xn--) or decodes Punycode back into human-readable glyphs.",
    },
    {
      name: "Inspect Homograph & Script Security",
      text: "Review the real-time security analyzer to detect mixed-script spoofing attacks (such as mixing Cyrillic and Latin alphabets to mimic legitimate brand names).",
    },
    {
      name: "Validate RFC DNS Octet Limits",
      text: "Verify that each domain label remains under 63 bytes and the total Fully Qualified Domain Name (FQDN) does not exceed 253 bytes.",
    },
    {
      name: "Batch Process & Export Data",
      text: "Switch to Batch Mode to convert up to 50 domains simultaneously, copy formatted ASCII strings, or export a CSV report.",
    },
  ],
  guideContent: {
    title: "The Architectural Guide to Internationalized Domain Names (IDN), Punycode (RFC 3492), and Homograph Security",
    sections: [
      {
        heading: "What is an Internationalized Domain Name (IDN) and Why is Punycode Necessary?",
        content:
          "<p>The original Internet <strong>Domain Name System (DNS)</strong> architecture, standardized in RFC 1034 and RFC 1035, was designed to support only a restricted subset of 7-bit ASCII characters (letters <code>a-z</code>, digits <code>0-9</code>, and the hyphen <code>-</code>). This restriction is known as the <strong>LDH (Letters, Digits, Hyphen)</strong> rule.</p><p>As the Internet expanded globally, billions of native speakers required domain names in non-Latin scripts including <strong>Arabic, Cyrillic, Chinese, Japanese, Hebrew, Hindi, Greek</strong>, and languages using accented Latin glyphs (such as German umlauts <code>ä, ö, ü</code>, French accents <code>é, à</code>, or Spanish <code>ñ</code>). To enable these Internationalized Domain Names (IDNs) without requiring a catastrophic overhaul of global DNS root name servers, the IETF developed <strong>Punycode (RFC 3492)</strong> and the <strong>IDNA (Internationalizing Domain Names in Applications)</strong> standards (RFC 5890–5894).</p><p>Punycode translates any arbitrary sequence of Unicode code points into an <strong>ASCII Compatible Encoding (ACE)</strong> format prefixed with <code>xn--</code>. For example, <code>münchen.de</code> is deterministically encoded as <code>xn--mnchen-3ya.de</code>, and <code>دبي.امارات</code> becomes <code>xn--mgbh0fb.xn--mgbaam7a8h</code>.</p>",
        keyTakeaways: [
          "DNS root servers strictly process 7-bit ASCII characters (LDH rule).",
          "Punycode (RFC 3492) maps Unicode scripts to ASCII Compatible Encoding (ACE) starting with xn--.",
          "Web browsers resolve and display the native Unicode script in the address bar while transmitting the xn-- ASCII form over the DNS protocol.",
        ],
      },
      {
        heading: "IDN Homograph Phishing Attacks: How Mixed-Script Spoofing Operates",
        content:
          "<p>An <strong>IDN Homograph Attack</strong> is a dangerous social engineering and cyber spoofing technique where an attacker registers a domain name containing visual look-alike glyphs (homoglyphs) from different Unicode scripts to impersonate a trusted institution or brand.</p><p>Many characters in the Cyrillic, Greek, and Latin alphabets share identical visual appearances (identical glyphs) but possess completely different Unicode code points:</p><ul><li><strong>Latin 'a' (U+0061)</strong> vs. <strong>Cyrillic 'а' (U+0430)</strong></li><li><strong>Latin 'c' (U+0063)</strong> vs. <strong>Cyrillic 'с' (U+0441)</strong></li><li><strong>Latin 'e' (U+0065)</strong> vs. <strong>Cyrillic 'е' (U+0435)</strong></li><li><strong>Latin 'o' (U+006F)</strong> vs. <strong>Cyrillic 'о' (U+043E)</strong> / <strong>Greek 'ο' (U+03BF)</strong></li><li><strong>Latin 'p' (U+0070)</strong> vs. <strong>Cyrillic 'р' (U+0440)</strong> / <strong>Greek 'ρ' (U+03C1)</strong></li></ul><p>For example, an attacker can craft the domain <code>pаypal.com</code> by substituting the second letter 'a' with Cyrillic <code>U+0430</code>. To a human eye, the URL looks indistinguishable from the authentic payment gateway. However, DNS translates this spoofed domain to <code>xn--pypal-4ve.com</code>. Modern web browsers employ strict anti-homograph heuristics—if a domain mixes scripts unexpectedly, the browser forces the address bar to display the raw <code>xn--</code> Punycode string to alert the user.</p>",
        keyTakeaways: [
          "Homograph attacks exploit identical-looking characters across different alphabets (e.g. Cyrillic 'а' vs Latin 'a').",
          "Mixing Latin with Cyrillic or Greek in a single domain label is a primary indicator of phishing intent.",
          "OmniSEO's inspector scans every character code point to detect multi-script spoofing risks before deployment.",
        ],
      },
      {
        heading: "DNS Label Limits and RFC Octet Calculations for IDNs",
        content:
          "<p>When registering and configuring Internationalized Domain Names, developers must account for physical DNS byte restrictions defined in RFC 1035:</p><ul><li><strong>Maximum Label Length:</strong> Any single domain label (the string between two dots) cannot exceed <strong>63 octets (bytes)</strong>.</li><li><strong>Maximum FQDN Length:</strong> The total Fully Qualified Domain Name cannot exceed <strong>253 octets</strong> (including separating dots).</li></ul><p>Because Punycode encodes non-ASCII characters into variable-length base-36 ASCII strings, a seemingly short 15-character Arabic or emoji domain can expand significantly in its encoded form. If the generated <code>xn--</code> string exceeds 63 bytes, DNS servers and domain registrars will reject the configuration.</p>",
        keyTakeaways: [
          "DNS limits are measured in raw bytes/octets of the xn-- Punycode string, not Unicode character count.",
          "Single label limit: 63 bytes (e.g., xn--[encoded-string] must be <= 63 chars).",
          "Total FQDN limit: 253 bytes including all subdomains and top-level domain labels.",
        ],
      },
      {
        heading: "SEO, SSL/TLS, and Webmaster Best Practices for IDNs",
        content:
          "<p>Managing an internationalized domain for technical search engine optimization requires specific considerations across search crawlers and infrastructure:</p><ol><li><strong>Googlebot &amp; Search Indexing:</strong> Google crawls and indexes both Unicode and Punycode domain formats seamlessly. However, in server logs, Googlebot user-agent requests typically arrive using the <code>xn--</code> ASCII host header.</li><li><strong>Hreflang Tags &amp; Canonical URLs:</strong> Always be consistent in your canonical tags, XML sitemaps, and hreflang annotations. While Google can normalize IDNs, using either 100% UTF-8 native URLs or 100% Punycode URLs consistently across internal links prevents canonical confusion.</li><li><strong>SSL / TLS Certificates:</strong> When provisioning HTTPS certificates (via Let's Encrypt, Cloudflare, or AWS ACM), the Common Name (CN) and Subject Alternative Names (SANs) must be specified in their <strong>Punycode (xn--) format</strong>. Certificate Authorities sign and validate certificates based on the ASCII representation.</li><li><strong>Email Deliverability (EAI):</strong> Email Address Internationalization (RFC 6530) is not universally supported by legacy mail exchange (MX) relays. For critical transactional emails, maintaining ASCII aliases is recommended.</li></ol>",
        keyTakeaways: [
          "Provision SSL/TLS certificates using the xn-- Punycode string.",
          "Maintain uniform canonical and hreflang URL formatting across XML sitemaps.",
          "Configure web server vhosts (Nginx/Apache) to listen for the xn-- server_name.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "How does Google Search handle and crawl Internationalized Domain Names (IDNs)?",
      answer:
        "Googlebot fully supports crawling, indexing, and ranking IDN websites. In Google Search results, Google renders the human-readable Unicode script for users searching in native languages. In internal server request logs and analytics connectors, the domain is typically resolved as its ASCII Punycode (xn--) equivalent.",
    },
    {
      question: "What is the difference between Unicode and Punycode?",
      answer:
        "Unicode is a universal character encoding standard that assigns a unique numerical code point to every character, letter, symbol, and emoji across all global languages. Punycode (RFC 3492) is a specialized encoding algorithm that translates those Unicode code points into an ASCII-only string starting with 'xn--' so that legacy DNS name servers can process internationalized domains.",
    },
    {
      question: "Do I need to buy an SSL certificate for the Unicode name or the xn-- Punycode name?",
      answer:
        "You must issue and validate SSL/TLS certificates using the ASCII Punycode (xn--) domain name. Certificate Authorities (such as Let's Encrypt, DigiCert, or Sectigo) operate strictly on the DNS-compatible Punycode string. Web browsers will automatically link the certificate to the Unicode address displayed in the user's address bar.",
    },
    {
      question: "Why do browsers sometimes display xn-- instead of the native Unicode domain?",
      answer:
        "Web browsers (such as Chrome, Firefox, and Safari) intentionally display the raw xn-- Punycode string when they detect potential security risks, specifically IDN Homograph Attacks (where characters from multiple scripts like Latin and Cyrillic are mixed in a single domain label) or when the top-level domain (TLD) does not enforce strict character set registration policies.",
    },
    {
      question: "Can I use emojis in domain names?",
      answer:
        "Yes, emojis can be encoded into Punycode (e.g. i❤️coding.ws becomes xn--icoding-2s44e.ws). However, ICANN regulations prohibit emoji registrations in new generic top-level domains (gTLDs like .com or .org). Emoji domains are primarily supported by select country-code TLDs (such as .ws, .to, or .fm).",
    },
    {
      question: "Does this Punycode converter transmit my domains to a remote server?",
      answer:
        "No. All encoding, decoding, RFC 3492 algorithms, DNS length checks, and homograph security evaluations are executed 100% locally in your browser's client-side JavaScript engine. Your private domain portfolios and client URLs are never sent across the network.",
    },
  ],
};
