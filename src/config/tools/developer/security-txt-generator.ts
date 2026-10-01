import { ToolDefinition } from "@/types/tool";

export const securityTxtGeneratorTool: ToolDefinition = {
  id: "security-txt-generator",
  slug: "security-txt-generator",
  name: "RFC 9116 Security.txt Generator",
  title: "RFC 9116 security.txt Generator & Validator | OmniSEO Tools",
  metaTitle: "RFC 9116 security.txt Generator & Validator | OmniSEO Tools",
  metaDescription:
    "Generate standardized security.txt files adhering to RFC 9116 for ethical vulnerability disclosure. Export for Next.js App Router, Nginx, Apache, and Cloudflare with zero telemetry.",
  h1: "RFC 9116 Security.txt Generator & Validator",
  tagline:
    "Generate and validate production-ready security.txt files adhering to the official IETF RFC 9116 standard for responsible vulnerability disclosure.",
  shortDescription:
    "Generate standardized RFC 9116 security.txt files with automated expiry dates, PGP encryption keys, and multi-server deployment snippets.",
  category: "developer",
  icon: "ShieldCheck",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "security.txt generator",
    "rfc 9116 generator",
    "vulnerability disclosure policy",
    "security.txt validator",
    "well known security txt",
    "responsible disclosure policy",
    "pgp security.txt",
    "next.js security.txt route",
    "nginx security.txt config",
  ],
  howToSteps: [
    {
      name: "Configure Contact Channels (Required)",
      text: "Provide at least one secure contact method using a mailto: email address (e.g. mailto:security@example.com) or an encrypted HTTPS web report form.",
    },
    {
      name: "Set Policy Expiration Date (Required)",
      text: "Specify an ISO 8601 formatted expiration date (RFC 9116 requires an 'Expires' directive, typically recommended up to 1 year ahead).",
    },
    {
      name: "Attach Public PGP Encryption Key",
      text: "Provide a direct HTTPS URL to your security team's public PGP/GPG key or security key server so researchers can encrypt vulnerability reports.",
    },
    {
      name: "Declare Canonical Location & Policies",
      text: "Define Canonical URL (https://yourdomain.com/.well-known/security.txt), security policy guidelines, and Hall of Fame acknowledgments.",
    },
    {
      name: "Export and Deploy to /.well-known/",
      text: "Copy the formatted plain-text snippet or export server configurations for Next.js App Router, Nginx, Apache, or Cloudflare Pages.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to RFC 9116 Security.txt & Responsible Vulnerability Disclosure",
    sections: [
      {
        heading: "What is security.txt and Why Did IETF Standardize RFC 9116?",
        content:
          "<p><strong>security.txt</strong> is an Internet standard published by the <strong>Internet Engineering Task Force (IETF RFC 9116)</strong> that defines a standardized machine-readable text file where organizations publish their contact information for receiving vulnerability reports.</p><p>Historically, ethical security researchers, white-hat bug hunters, and academic cryptographers who discovered critical security flaws on a website struggled to find appropriate security contacts, often resorting to emailing generic support inboxes or publicly tagging founders on social media. RFC 9116 eliminates this friction by establishing a globally standardized location: <code>/.well-known/security.txt</code> (with an optional legacy fallback at <code>/security.txt</code>).</p>",
        keyTakeaways: [
          "RFC 9116 standardizes the location, syntax, and mandatory fields of security.txt.",
          "Must be served at https://yourdomain.com/.well-known/security.txt with Content-Type: text/plain.",
          "Both 'Contact' and 'Expires' directives are mandatory under the official RFC 9116 standard.",
        ],
      },
      {
        heading: "Mandatory vs. Optional Directives in RFC 9116",
        content:
          "<p>The RFC 9116 standard classifies directives into mandatory requirements and optional enhancements:</p><ul><li><strong>Contact (Mandatory):</strong> At least one contact URI must be present. Must begin with <code>mailto:</code> (e.g. <code>mailto:security@yourdomain.com</code>) or <code>https://</code> (e.g. <code>https://hackerone.com/yourprogram</code>).</li><li><strong>Expires (Mandatory):</strong> An ISO 8601 formatted datetime indicating when the policy expires (e.g. <code>2027-10-01T00:00:00.000Z</code>). Stale or missing expiry dates cause automated vulnerability scanners to flag the file as invalid.</li><li><strong>Encryption (Optional):</strong> Link to your public PGP key (e.g. <code>https://yourdomain.com/pgp-key.txt</code> or OpenPGP keyserver).</li><li><strong>Acknowledgments (Optional):</strong> Link to a Hall of Fame or security researcher leaderboard.</li><li><strong>Canonical (Optional):</strong> The authoritative URL of the security.txt file, preventing caching poisoning.</li><li><strong>Policy (Optional):</strong> Link to terms for safe harbor and authorized testing rules.</li><li><strong>Preferred-Languages (Optional):</strong> Comma-separated list of supported language codes (e.g. <code>en, es, de, ar</code>).</li><li><strong>Hiring (Optional):</strong> Link to security engineering career openings.</li></ul>",
        keyTakeaways: [
          "Always set the Expires date no more than 365 days into the future and refresh it during annual security audits.",
          "Include a Safe Harbor policy link to assure ethical hackers they will not face legal action for responsible reporting.",
          "All URLs declared in security.txt must use HTTPS strictly.",
        ],
      },
      {
        heading: "Deployment Best Practices: Next.js, Nginx, Apache & Cloudflare",
        content:
          "<p>When deploying <code>security.txt</code>, observe the following production requirements:</p><ol><li><strong>Strict Content-Type:</strong> Always serve the file with <code>Content-Type: text/plain; charset=utf-8</code>. Never serve it as HTML.</li><li><strong>HTTPS Exclusivity:</strong> The file must only be accessible over HTTPS. Unencrypted HTTP requests should redirect with a 301 to HTTPS.</li><li><strong>Next.js App Router:</strong> Create a Route Handler at <code>src/app/.well-known/security.txt/route.ts</code> that returns a plain <code>Response</code> with cache-control headers.</li><li><strong>Nginx Server Block:</strong> Add a dedicated location block <code>location = /.well-known/security.txt { default_type text/plain; }</code>.</li></ol>",
        keyTakeaways: [
          "Ensure /.well-known/security.txt returns HTTP 200 OK without requiring authentication.",
          "Set proper Cache-Control headers (e.g. max-age=86400) for edge CDN caching.",
          "Optionally digitally sign the file with GPG clearsign signatures for maximum cryptographic authenticity.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Where should the security.txt file be located on my website?",
      answer:
        "According to RFC 9116, the security.txt file MUST be placed inside the standard .well-known directory at https://yourdomain.com/.well-known/security.txt. You may also configure a redirect or copy at https://yourdomain.com/security.txt for backwards compatibility with legacy tooling.",
    },
    {
      question: "What happens if my security.txt file has an expired 'Expires' date?",
      answer:
        "RFC 9116 requires the Expires directive so that abandoned or stale security policies are not followed indefinitely. Automated security crawlers and bug bounty platforms consider a security.txt file invalid if the Expires date is in the past. It is best practice to set the date one year ahead and refresh it annually.",
    },
    {
      question: "Can I include multiple Contact directives?",
      answer:
        "Yes. RFC 9116 allows multiple Contact directives. For example, you can provide both a direct security email (Contact: mailto:security@example.com) and an external bug bounty portal (Contact: https://bugcrowd.com/yourbrand).",
    },
    {
      question: "Does this security.txt generator transmit my data over the network?",
      answer:
        "No. All generation, ISO date calculation, syntax validation, and code exports occur 100% client-side in your local browser JavaScript engine with zero external telemetry.",
    },
  ],
};
