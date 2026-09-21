export interface RobotsRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
}

export interface RobotsConfig {
  rules: RobotsRule[];
  sitemaps: string[];
  host?: string;
}

export interface RobotsValidationIssue {
  line: number;
  type: "error" | "warning";
  message: string;
}

export interface RobotsValidationResult {
  isValid: boolean;
  issues: RobotsValidationIssue[];
  parsed: RobotsConfig;
}

/**
 * Parses raw robots.txt content into a structured RobotsConfig object.
 * Ignores comments and whitespace.
 *
 * @param raw - The raw robots.txt file string.
 * @returns Structured RobotsConfig with rules, sitemaps, and optional host.
 */
export function parseRobotsTxt(raw: string): RobotsConfig {
  const lines = raw.split(/\r?\n/);
  const rules: RobotsRule[] = [];
  const sitemaps: string[] = [];
  let host: string | undefined = undefined;

  let currentRules: RobotsRule[] = [];
  let lastWasUserAgent = false;

  for (const rawLine of lines) {
    const commentIdx = rawLine.indexOf("#");
    const cleanLine = (commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine).trim();

    if (!cleanLine) {
      continue;
    }

    const colonIdx = cleanLine.indexOf(":");
    if (colonIdx === -1) {
      continue;
    }

    const directive = cleanLine.slice(0, colonIdx).trim().toLowerCase();
    const value = cleanLine.slice(colonIdx + 1).trim();

    switch (directive) {
      case "user-agent":
      case "useragent": {
        if (!lastWasUserAgent) {
          currentRules = [];
        }
        const rule: RobotsRule = {
          userAgent: value || "*",
          allow: [],
          disallow: [],
        };
        rules.push(rule);
        currentRules.push(rule);
        lastWasUserAgent = true;
        break;
      }
      case "allow": {
        lastWasUserAgent = false;
        if (currentRules.length === 0) {
          const rule: RobotsRule = { userAgent: "*", allow: [], disallow: [] };
          rules.push(rule);
          currentRules.push(rule);
        }
        for (const rule of currentRules) {
          if (value && !rule.allow.includes(value)) {
            rule.allow.push(value);
          }
        }
        break;
      }
      case "disallow": {
        lastWasUserAgent = false;
        if (currentRules.length === 0) {
          const rule: RobotsRule = { userAgent: "*", allow: [], disallow: [] };
          rules.push(rule);
          currentRules.push(rule);
        }
        for (const rule of currentRules) {
          if (value && !rule.disallow.includes(value)) {
            rule.disallow.push(value);
          }
        }
        break;
      }
      case "crawl-delay":
      case "crawldelay": {
        lastWasUserAgent = false;
        const delay = parseFloat(value);
        if (!isNaN(delay) && delay >= 0) {
          if (currentRules.length === 0) {
            const rule: RobotsRule = { userAgent: "*", allow: [], disallow: [] };
            rules.push(rule);
            currentRules.push(rule);
          }
          for (const rule of currentRules) {
            rule.crawlDelay = delay;
          }
        }
        break;
      }
      case "sitemap": {
        lastWasUserAgent = false;
        if (value && !sitemaps.includes(value)) {
          sitemaps.push(value);
        }
        break;
      }
      case "host": {
        lastWasUserAgent = false;
        if (value) {
          host = value;
        }
        break;
      }
      default: {
        lastWasUserAgent = false;
        break;
      }
    }
  }

  return {
    rules,
    sitemaps,
    ...(host ? { host } : {}),
  };
}

/**
 * Validates a robots.txt string and checks for syntax errors, missing User-agents,
 * invalid paths, or malformed sitemap URLs.
 *
 * @param raw - The raw robots.txt file string.
 * @returns RobotsValidationResult containing validation status, issues, and parsed config.
 */
export function validateRobotsTxt(raw: string): RobotsValidationResult {
  const lines = raw.split(/\r?\n/);
  const issues: RobotsValidationIssue[] = [];
  let hasUserAgentSeen = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const rawLine = lines[i];

    const commentIdx = rawLine.indexOf("#");
    const cleanLine = (commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine).trim();

    if (!cleanLine) {
      continue;
    }

    const colonIdx = cleanLine.indexOf(":");
    if (colonIdx === -1) {
      issues.push({
        line: lineNum,
        type: "error",
        message: `Syntax error: missing ":" key-value separator on line ${lineNum}.`,
      });
      continue;
    }

    const directive = cleanLine.slice(0, colonIdx).trim().toLowerCase();
    const value = cleanLine.slice(colonIdx + 1).trim();

    switch (directive) {
      case "user-agent":
      case "useragent": {
        if (!value) {
          issues.push({
            line: lineNum,
            type: "warning",
            message: "User-agent directive is empty.",
          });
        }
        hasUserAgentSeen = true;
        break;
      }
      case "allow":
      case "disallow": {
        if (!hasUserAgentSeen) {
          issues.push({
            line: lineNum,
            type: "warning",
            message: `Directive "${directive}" defined before any User-agent declaration.`,
          });
        }
        if (value) {
          if (!value.startsWith("/") && !value.startsWith("*")) {
            issues.push({
              line: lineNum,
              type: "warning",
              message: `Path "${value}" should start with a leading slash "/" or wildcard "*".`,
            });
          }
          if (/\s/.test(value)) {
            issues.push({
              line: lineNum,
              type: "warning",
              message: `Path "${value}" contains unencoded whitespace.`,
            });
          }
        }
        break;
      }
      case "crawl-delay":
      case "crawldelay": {
        if (!hasUserAgentSeen) {
          issues.push({
            line: lineNum,
            type: "warning",
            message: `Directive "${directive}" defined before any User-agent declaration.`,
          });
        }
        const delay = Number(value);
        if (isNaN(delay) || delay < 0) {
          issues.push({
            line: lineNum,
            type: "error",
            message: `Crawl-delay must be a non-negative number, got "${value}".`,
          });
        }
        break;
      }
      case "sitemap": {
        if (!value) {
          issues.push({
            line: lineNum,
            type: "error",
            message: "Sitemap directive is empty.",
          });
        } else {
          try {
            const url = new URL(value);
            if (url.protocol !== "http:" && url.protocol !== "https:") {
              issues.push({
                line: lineNum,
                type: "error",
                message: `Malformed Sitemap URL: protocol must be http or https, got "${url.protocol}".`,
              });
            }
          } catch {
            issues.push({
              line: lineNum,
              type: "error",
              message: `Malformed Sitemap URL: "${value}" is not a valid absolute URL.`,
            });
          }
        }
        break;
      }
      case "host": {
        if (!value) {
          issues.push({
            line: lineNum,
            type: "warning",
            message: "Host directive is empty.",
          });
        }
        break;
      }
      default: {
        issues.push({
          line: lineNum,
          type: "warning",
          message: `Unknown or non-standard directive "${directive}".`,
        });
        break;
      }
    }
  }

  const parsed = parseRobotsTxt(raw);
  const isValid = issues.filter((i) => i.type === "error").length === 0;

  return {
    isValid,
    issues,
    parsed,
  };
}

/**
 * Serializes a RobotsConfig object into a clean, standard-compliant robots.txt string.
 *
 * @param config - The structured robots.txt configuration.
 * @returns Clean, formatted robots.txt string.
 */
export function generateRobotsTxt(config: RobotsConfig): string {
  const sections: string[] = [];

  if (config.rules && config.rules.length > 0) {
    for (const rule of config.rules) {
      const lines: string[] = [];
      lines.push(`User-agent: ${rule.userAgent}`);
      if (rule.allow && rule.allow.length > 0) {
        for (const path of rule.allow) {
          lines.push(`Allow: ${path}`);
        }
      }
      if (rule.disallow && rule.disallow.length > 0) {
        for (const path of rule.disallow) {
          lines.push(`Disallow: ${path}`);
        }
      }
      if (rule.crawlDelay !== undefined && rule.crawlDelay >= 0) {
        lines.push(`Crawl-delay: ${rule.crawlDelay}`);
      }
      sections.push(lines.join("\n"));
    }
  }

  const footerLines: string[] = [];
  if (config.host) {
    footerLines.push(`Host: ${config.host}`);
  }
  if (config.sitemaps && config.sitemaps.length > 0) {
    for (const sitemap of config.sitemaps) {
      footerLines.push(`Sitemap: ${sitemap}`);
    }
  }
  if (footerLines.length > 0) {
    sections.push(footerLines.join("\n"));
  }

  return sections.join("\n\n");
}
