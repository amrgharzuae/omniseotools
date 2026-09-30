export interface AiCrawlerPlatformFaq {
  question: string;
  answer: string;
}

export interface AiCrawlerPlatformHowToStep {
  name: string;
  text: string;
}

export interface AiCrawlerPlatformConfig {
  slug: "cloudflare" | "nextjs" | "nginx";
  name: string;
  shortName: string;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  targetArchitectureQuirk: string;
  coreH2: string;
  activeTabDefault: "cloudflare" | "nextjs" | "nginx";
  platformSnippet: string;
  directAnswer: string;
  educationalContent: string;
  howToSteps: AiCrawlerPlatformHowToStep[];
  faqs: AiCrawlerPlatformFaq[];
}

export const AI_CRAWLER_FIREWALL_PLATFORMS: AiCrawlerPlatformConfig[] = [
  // 1. Cloudflare
  {
    slug: "cloudflare",
    name: "Cloudflare (WAF Rules & Workers)",
    shortName: "Cloudflare",
    title: "Cloudflare AI Crawler Firewall & WAF Rule Generator | OmniSEO Tools",
    metaDescription:
      "Generate custom Cloudflare WAF expressions and Cloudflare Worker snippets to block aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider, CCBot) at the edge without affecting SEO.",
    h1: "Cloudflare AI Crawler Firewall & WAF Rule Generator",
    tagline:
      "Generate granular Cloudflare WAF expressions and edge firewall rules to block AI training bots and high-frequency scrapers before they reach your origin server.",
    targetArchitectureQuirk:
      "Cloudflare's free 'AI Scrapers and Crawlers' managed toggle is an all-or-nothing switch that can inadvertently block useful search indexers (like PerplexityBot). Custom WAF expressions allow granular exclusion of training bots while allowing search citation engines.",
    coreH2: "Granular Edge Blocking: Writing Custom Cloudflare WAF Rules vs Managed AI Toggles",
    activeTabDefault: "cloudflare",
    platformSnippet:
      '(http.user_agent contains "GPTBot" or http.user_agent contains "ClaudeBot" or http.user_agent contains "Bytespider" or http.user_agent contains "CCBot" or http.user_agent contains "Diffbot")',
    directAnswer:
      "To block AI crawlers in Cloudflare with maximum precision, navigate to Security > WAF > Custom Rules and create a rule matching incoming `http.user_agent` strings. While Cloudflare provides a single-click 'Block AI Scrapers and Crawlers' toggle under Security > Bots, that toggle acts as a blanket filter that may block emerging search engines (PerplexityBot, ChatGPT-User) that drive legitimate organic referral traffic. Custom WAF expressions allow you to selectively block offline foundation model scrapers (GPTBot, ClaudeBot, CCBot) while whitelisting AI search assistants and verified search engine crawlers.",
    educationalContent: `
      <p>Deploying AI firewall rules at Cloudflare's edge stops automated LLM harvesters in <strong>Phase 1</strong> of the Cloudflare request lifecycle—well before requests consume origin CPU, memory, or bandwidth.</p>

      <h3>1. Why Custom WAF Expressions Outperform Cloudflare's Managed AI Toggle</h3>
      <p>Cloudflare introduced a global toggle to block AI scrapers, but enterprise and high-traffic SEO teams frequently encounter limitations with managed bot categories:</p>
      <ul>
        <li><strong>Loss of Referral Traffic:</strong> The blanket toggle blocks real-time search assistants (such as <code>ChatGPT-User</code>, <code>PerplexityBot</code>, and <code>Claude-Web</code>). When an end user asks ChatGPT or Perplexity to search the web for recommendations in your niche, the AI cannot fetch your URL and will cite your competitors instead.</li>
        <li><strong>Lack of Granularity:</strong> You cannot separate aggressive bandwidth extractors (like ByteDance's <code>Bytespider</code>) from polite commercial models (like Anthropic's <code>ClaudeBot</code>).</li>
        <li><strong>Custom Action Flexibility:</strong> Custom WAF rules allow you to choose between <code>Block (HTTP 403)</code>, <code>Managed Challenge</code> (for suspicious variations), or <code>JS Challenge</code>, rather than forced global drops.</li>
      </ul>

      <h3>2. How Cloudflare Evaluates WAF Rules</h3>
      <p>Cloudflare processes HTTP requests in a strict execution pipeline:</p>
      <ol>
        <li><strong>DDoS &amp; IP Access Rules:</strong> Evaluates layer 3/4 threats and blocklists.</li>
        <li><strong>Custom WAF Rules (Phase 1):</strong> Evaluates your custom User-Agent expression. If matched with action <code>Block</code>, Cloudflare returns an immediate <code>403 Forbidden</code> edge response (latency &lt; 3ms).</li>
        <li><strong>Cache Reserve &amp; Tiered Cache:</strong> Bypassed entirely for blocked bots, protecting cache limits.</li>
        <li><strong>Cloudflare Workers / Origin Server:</strong> Never invoked, resulting in zero serverless compute charges or origin bandwidth consumption.</li>
      </ol>

      <h3>3. Preventing False Positives with Search Engines</h3>
      <p>Always combine User-Agent substring matches with Cloudflare's built-in <code>cf.client.bot</code> boolean if you wish to guarantee that verified Googlebot, Bingbot, or Applebot requests are never collateral damage. A hardened expression looks like: <code>(http.user_agent contains "GPTBot" or http.user_agent contains "Bytespider") and not cf.client.bot</code>.</p>
    `,
    howToSteps: [
      {
        name: "Log into Cloudflare Dashboard",
        text: "Select your domain and navigate to the Security section in the left navigation sidebar.",
      },
      {
        name: "Access Custom WAF Rules",
        text: "Click on WAF (Web Application Firewall) and select the 'Custom Rules' tab. Click 'Create rule'.",
      },
      {
        name: "Enter Rule Name and Expression",
        text: "Name the rule 'Block AI Training Crawlers & Scrapers'. Click 'Edit expression' and paste the custom WAF expression generated above.",
      },
      {
        name: "Configure Firewall Action",
        text: "Under 'Choose action', select 'Block' (or 'Managed Challenge' if you wish to verify automated browsers).",
      },
      {
        name: "Deploy and Monitor WAF Events",
        text: "Click 'Deploy'. Check Security > Events after a few hours to monitor dropped crawler requests and blocked bandwidth savings in real time.",
      },
    ],
    faqs: [
      {
        question: "Does Cloudflare WAF run before Cache Reserve and Worker invocations?",
        answer:
          "Yes. Cloudflare Custom WAF Rules execute in Phase 1 of the request pipeline before Cache Reserve lookups and Cloudflare Worker compute. This guarantees that blocked AI scrapers do not consume Worker request quotas, Cache Reserve operations, or origin server compute cycles.",
      },
      {
        question: "Why should I avoid the one-click Cloudflare 'Block AI Scrapers' toggle?",
        answer:
          "The generic one-click toggle is an all-or-nothing switch that blocks citation engines and AI search assistants (like PerplexityBot and ChatGPT-User) alongside bulk LLM harvesters. Custom WAF expressions provide full granular control, allowing you to block training data crawlers while preserving organic AI search referral traffic.",
      },
      {
        question: "Should I use 'Block' (403) or 'Managed Challenge' for AI crawlers in Cloudflare?",
        answer:
          "For known, non-browser AI scrapers (such as Bytespider, CCBot, or Diffbot), choosing 'Block' is recommended because headless bots cannot solve Turnstile challenges and a hard 403 terminates the TCP connection with the least overhead. For ambiguous user agents, 'Managed Challenge' provides an extra layer of protection against spoofing.",
      },
    ],
  },

  // 2. Next.js App Router
  {
    slug: "nextjs",
    name: "Next.js App Router (Edge Middleware)",
    shortName: "Next.js",
    title: "Next.js AI Scraper Firewall & Edge Middleware Generator | OmniSEO Tools",
    metaDescription:
      "Configure lightweight Next.js App Router edge middleware to intercept and return 403 Forbidden responses to unauthorized LLM scrapers before Server Components execute.",
    h1: "Next.js AI Scraper Firewall & Edge Middleware Generator",
    tagline:
      "Block aggressive AI scrapers and automated LLM harvesters in Next.js Edge Middleware before Server Components, React Server Actions, or database queries run.",
    targetArchitectureQuirk:
      "Uncached Server Components (RSC) and dynamic Server Actions execute heavy database queries or third-party APIs whenever scrapers hammer pages, causing CPU spikes and Vercel edge function cost blowouts unless blocked early in middleware.ts.",
    coreH2: "Protecting Server Components and Vercel Function Executions with Edge Middleware",
    activeTabDefault: "nextjs",
    platformSnippet: `// src/middleware.ts (Next.js Edge Runtime AI Crawler Firewall)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_AI_BOTS = /(GPTBot|ClaudeBot|Bytespider|CCBot|Diffbot)/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  if (BLOCKED_AI_BOTS.test(userAgent)) {
    return new NextResponse('Forbidden: Automated AI Scraping Prohibited', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Cache-Control': 'no-store',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png).*)'],
};`,
    directAnswer:
      "In Next.js (App Router or Pages Router), the most efficient way to block AI crawlers is by implementing Edge Middleware (`middleware.ts`). Because middleware runs on the lightweight V8 Edge Runtime prior to page rendering, incoming requests matching blocked AI User-Agent strings receive an instant `HTTP 403 Forbidden` response in <2ms. This completely prevents React Server Components (RSC) from executing costly database queries, ORM calls, or serverless function invocations on Vercel, AWS Amplify, or Node.js Docker containers.",
    educationalContent: `
      <p>Modern Next.js App Router applications heavily utilize <strong>React Server Components (RSC)</strong>, Dynamic Route Handlers, and Server Actions. When unthrottled AI crawlers (like Bytespider) scrape thousands of dynamic URLs in parallel, they trigger server-side rendering pipelines that can exhaust database connection pools.</p>

      <h3>1. The Hidden Cost of AI Crawling on Next.js Server Components</h3>
      <p>Unlike legacy static websites, dynamic Next.js routes often execute server-side data fetching on demand:</p>
      <ul>
        <li><code>async function Page({ params })</code> executes Prisma/Drizzle database queries for each URL variation.</li>
        <li>On Vercel or AWS Lambda, each crawler request counts against your monthly <strong>Serverless Function Execution Duration</strong> and Edge Middleware invocations.</li>
        <li>High-concurrency bursts from scrapers can trigger database rate limits, causing 504 Gateway Timeouts for real human users.</li>
      </ul>

      <h3>2. Why Edge Middleware is the Ideal Next.js Defense</h3>
      <p>Next.js Edge Middleware executes at the CDN edge before the Node.js rendering runtime is initialized. Returning a <code>new NextResponse('Forbidden', { status: 403 })</code> terminates the request cycle immediately. The server never reads <code>page.tsx</code>, never compiles React component trees, and never connects to your database.</p>

      <h3>3. Optimizing the Next.js Middleware Matcher</h3>
      <p>To ensure maximum efficiency and prevent middleware execution on static assets, use an optimized negative lookahead matcher in <code>export const config</code>:</p>
      <pre><code>export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};</code></pre>
      <p>This skips middleware execution for static images and JavaScript chunks while strictly filtering all HTML document and API route requests.</p>
    `,
    howToSteps: [
      {
        name: "Create or Open middleware.ts",
        text: "In your Next.js project root (or inside the `src/` folder if using src directory), open or create `middleware.ts`.",
      },
      {
        name: "Import NextResponse and NextRequest",
        text: "Import `NextResponse` and `type NextRequest` from `'next/server'` at the top of the file.",
      },
      {
        name: "Define the Blocked User-Agent Regex",
        text: "Paste the compiled AI bot regex containing your selected crawler tokens (e.g. GPTBot, ClaudeBot, Bytespider).",
      },
      {
        name: "Return HTTP 403 Forbidden on Match",
        text: "Inspect `request.headers.get('user-agent')` and return an immediate 403 NextResponse with `X-Robots-Tag: noindex, nofollow` headers.",
      },
      {
        name: "Configure Matcher and Deploy",
        text: "Export the `config.matcher` array excluding `_next/static` and static image assets, then deploy to Vercel or your hosting provider.",
      },
    ],
    faqs: [
      {
        question: "Can Next.js middleware block scrapers without adding edge latency?",
        answer:
          "Yes. Next.js Edge Middleware runs on V8 isolates with cold start times under 1 millisecond. Testing the User-Agent header with a pre-compiled regular expression takes less than 0.05ms, introducing zero perceivable latency for legitimate users.",
      },
      {
        question: "How do I ensure Next.js middleware does not block legitimate search engines like Googlebot?",
        answer:
          "The generated regular expression matches specific, unambiguous AI training tokens (`GPTBot`, `ClaudeBot`, `Bytespider`, `CCBot`) without using broad keywords. Legitimate search engines (`Googlebot`, `Bingbot`, `DuckDuckBot`) do not contain these tokens and pass through freely.",
      },
      {
        question: "Where should middleware.ts be placed in Next.js App Router projects?",
        answer:
          "Place `middleware.ts` at the root of your project (same level as `package.json` and `app/`), or inside the `src/` folder (same level as `src/app/`) if your project uses the `src/` directory layout. Next.js supports exactly one `middleware.ts` per application.",
      },
    ],
  },

  // 3. Nginx
  {
    slug: "nginx",
    name: "Nginx (Reverse Proxy & HTTP 444 Drops)",
    shortName: "Nginx",
    title: "Nginx AI Bot Firewall & User-Agent Block Generator | OmniSEO Tools",
    metaDescription:
      "Generate high-performance Nginx map blocks to block or immediately drop connections (HTTP 444) for aggressive AI scrapers and automated LLM harvesters.",
    h1: "Nginx AI Bot Firewall & User-Agent Block Generator",
    tagline:
      "Generate lightning-fast Nginx map configurations and HTTP 444 connection drop rules to eliminate server CPU and bandwidth waste from AI scrapers.",
    targetArchitectureQuirk:
      "Standard 403 Forbidden responses still consume Nginx TCP connection overhead and transfer headers. Using Nginx non-standard 'return 444;' closes the TCP connection immediately without sending response headers, saving maximum server bandwidth against ByteSpider DDoS-style crawl bursts.",
    coreH2: "Zero-Overhead Scraping Defense: Nginx $http_user_agent Map and HTTP 444 Drops",
    activeTabDefault: "nginx",
    platformSnippet: `# /etc/nginx/conf.d/block_ai_bots.conf
map $http_user_agent $block_ai_crawler {
    default 0;
    "~*(GPTBot|ClaudeBot|Bytespider|CCBot|Diffbot|ImagesiftBot)" 1;
}

server {
    server_name example.com;

    # Immediate connection drop (HTTP 444) without sending HTTP headers
    if ($block_ai_crawler) {
        return 444;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
    directAnswer:
      "To protect origin Linux servers running Nginx from aggressive AI scrapers, configure an Nginx `map` directive in the `http {}` context that checks `$http_user_agent`. When a match is detected, execute `return 444;` inside your `server {}` block. Unlike standard HTTP 403 Forbidden responses that send TCP headers and error HTML (~500 bytes per request), Nginx's non-standard `return 444` instructs Nginx to immediately close the TCP connection with zero response bytes, neutralising high-concurrency bot crawls with near-zero CPU and zero outbound bandwidth.",
    educationalContent: `
      <p>Nginx is the world's most popular high-performance reverse proxy and web server. When configured correctly, Nginx can drop tens of thousands of rogue scraping requests per second without waking up upstream application servers (Node.js, PHP-FPM, Python Gunicorn, or Go).</p>

      <h3>1. Why HTTP 444 is Superior to HTTP 403 for Aggressive Scrapers</h3>
      <p>When an aggressive scraper like ByteDance's <code>Bytespider</code> sends 50 requests per second to your domain:</p>
      <ul>
        <li><strong>HTTP 403 Forbidden:</strong> Nginx completes the TLS handshake, constructs standard HTTP response headers, transmits an error payload, and closes the connection. Over 1,000,000 requests, this wastes over 500MB of network egress bandwidth and keeps Nginx worker sockets open.</li>
        <li><strong>HTTP 444 (No Response):</strong> Nginx immediately sends a TCP RST / FIN packet, dropping the socket with 0 bytes of response body or headers. The scraper client receives a connection reset error and typically backs off its crawl rate.</li>
      </ul>

      <h3>2. Why You Must Use 'map' Instead of Multiple 'if' Blocks</h3>
      <p>In Nginx architecture, 'If is Evil' when used improperly inside location blocks. Multiple regex <code>if ($http_user_agent ~* ...)</code> statements cause Nginx to evaluate conditions sequentially for every incoming request, creating CPU overhead.</p>
      <p>Using Nginx's <code>map $http_user_agent $block_ai_crawler</code> builds an optimized hash table and regex tree in memory during server startup. Evaluation runs in microseconds with zero memory allocations per request.</p>

      <h3>3. Modular Configuration Architecture</h3>
      <p>Best practice is to save the bot map in a dedicated file such as <code>/etc/nginx/conf.d/block_ai_bots.conf</code> so it can be shared across all virtual hosts (server blocks) on your server and updated automatically with a cron job.</p>
    `,
    howToSteps: [
      {
        name: "Create Configuration File in conf.d",
        text: "Create a dedicated config file: `sudo nano /etc/nginx/conf.d/block_ai_bots.conf`.",
      },
      {
        name: "Add the map $http_user_agent Block",
        text: "Paste the generated `map $http_user_agent $block_ai_crawler` definition into the file outside any server block.",
      },
      {
        name: "Add the return 444 Enforcement Block",
        text: "Inside your main `server { ... }` block (e.g. in `/etc/nginx/sites-available/your-site.conf`), add `if ($block_ai_crawler) { return 444; }` before your primary location block.",
      },
      {
        name: "Test Nginx Syntax",
        text: "Run `sudo nginx -t` in your terminal to verify that the configuration syntax is valid and error-free.",
      },
      {
        name: "Reload Nginx Daemon",
        text: "Execute `sudo systemctl reload nginx` (or `sudo nginx -s reload`) to apply the AI crawler firewall without dropping active user connections.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between Nginx HTTP 403 vs HTTP 444 for scrapers?",
        answer:
          "HTTP 403 sends a standard HTTP status line, response headers, and error page (averaging 300–600 bytes per request). Nginx non-standard `return 444;` instructs Nginx to immediately close the TCP connection without sending any response headers or body bytes, saving 100% of outbound bandwidth and exhausting scraper socket pools.",
      },
      {
        question: "Where should the Nginx map directive be placed?",
        answer:
          "The `map` block must reside in the `http {}` context (or inside an included file in `/etc/nginx/conf.d/`), while the `if ($block_ai_crawler) { return 444; }` statement belongs inside the `server {}` block of your virtual host configuration.",
      },
      {
        question: "Does Nginx user-agent mapping cause CPU bottlenecks during high traffic spikes?",
        answer:
          "No. Nginx `map` is compiled into an optimized internal lookup table at server startup. Regex matching in Nginx map is executed asynchronously during the header-filtering phase with sub-microsecond overhead.",
      },
    ],
  },
];

export function getAiCrawlerPlatformBySlug(slug: string): AiCrawlerPlatformConfig | undefined {
  return AI_CRAWLER_FIREWALL_PLATFORMS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllAiCrawlerPlatforms(): AiCrawlerPlatformConfig[] {
  return AI_CRAWLER_FIREWALL_PLATFORMS;
}
