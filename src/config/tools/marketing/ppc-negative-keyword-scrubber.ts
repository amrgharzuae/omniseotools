import { ToolDefinition } from "@/types/tool";

export const ppcNegativeKeywordScrubberTool: ToolDefinition = {
  id: "ppc-negative-keyword-scrubber",
  slug: "ppc-negative-keyword-scrubber",
  name: "PPC Negative Keyword List Scrubber & Match-Type Formatter",
  title: "PPC Negative Keyword List Scrubber & Match-Type Formatter | OmniSEO",
  metaTitle: "PPC Negative Keyword List Scrubber & Match-Type Formatter | OmniSEO",
  metaDescription:
    "Clean, deduplicate, normalize, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types instantly in your browser.",
  h1: "PPC Negative Keyword List Scrubber & Match-Type Formatter",
  tagline:
    "Clean, deduplicate, sanitize illegal characters, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types.",
  shortDescription:
    "Clean, deduplicate, normalize, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types instantly in your browser.",
  category: "marketing",
  icon: "Filter",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "ppc negative keyword scrubber",
    "negative keyword list builder",
    "google ads match type formatter",
    "ppc keyword cleaner",
    "negative keyword formatter",
    "negative phrase match converter",
    "negative exact match converter",
    "google ads editor negative keyword csv",
    "microsoft advertising negative keywords",
    "adwords negative keyword tool",
  ],
  howToSteps: [
    {
      name: "Paste Raw Keywords or Load Presets",
      text: "Paste your raw keyword lists into the left textarea (supports newline or comma separation), or click one of the quick preset packs (E-Commerce, B2B SaaS, Careers, Informational).",
    },
    {
      name: "Select Target Match Type",
      text: "Choose your desired PPC match type: Negative Phrase (-\"keyword\"), Negative Exact (-[keyword]), Negative Broad (-keyword), or standard Positive match types.",
    },
    {
      name: "Configure Cleaning & Sanitization Rules",
      text: "Toggle deduplication, lowercase normalization, whitespace trimming, and automatic stripping of Google Ads illegal characters (@, %, *, ^, ~, +, etc.) and stray quotes.",
    },
    {
      name: "Inspect Live Metrics & Limit Alerts",
      text: "Review the live metrics dashboard displaying original vs cleaned keyword counts, duplicates removed, illegal symbols purged, and Google Ads length limit alerts (>10 words or >80 characters).",
    },
    {
      name: "Export Formatted List or Google Ads Editor CSV",
      text: "Copy the cleaned list to your clipboard with 1 click, download as a clean .TXT file, or export a ready-to-import CSV with Campaign and Criterion Type columns for Google Ads Editor.",
    },
  ],
  editorialGuide: {
    title: "Mastering Negative Keywords & Match Types in Google Ads & Microsoft Advertising",
    sections: [
      {
        heading: "Why Negative Keywords are the Highest ROI Lever in Paid Search",
        content:
          "<p>In Google Ads and Microsoft Advertising, broad match and smart bidding algorithms continuously expand your keyword targeting to capture related queries. Without aggressive <strong>negative keyword filtering</strong>, up to 40% to 60% of your paid search budget can be wasted on irrelevant clicks, unqualified job seekers, freebie hunters, and student research queries.</p><p>Adding curated negative keyword lists prevents your ads from serving on non-converting search terms, directly lowering your <strong>Customer Acquisition Cost (CAC)</strong> and improving your <strong>Quality Score</strong> through higher Click-Through Rates (CTR).</p>",
        keyTakeaways: [
          "Negative keywords block unqualified search queries before ads trigger, protecting your ad budget.",
          "Improves account Quality Score by elevating expected CTR on tightly themed search intent.",
          "Essential when running Google Ads Smart Bidding, Performance Max, or Broad Match campaigns.",
        ],
      },
      {
        heading: "The Critical Difference Between Positive and Negative Match Types",
        content:
          "<p>A common pitfall among PPC advertisers is assuming negative match types behave identically to positive targeting match types. In reality, Google Ads applies <strong>substantially stricter rules to negative keywords</strong>:</p><table class=\"w-full text-xs text-left border border-slate-200 dark:border-slate-800 my-4\"><thead><tr class=\"bg-slate-100 dark:bg-slate-800\"><th class=\"p-2.5\">Negative Match Type</th><th class=\"p-2.5\">Syntax</th><th class=\"p-2.5\">Behavior & Matching Mechanics</th><th class=\"p-2.5\">Close Variants / Synonyms?</th></tr></thead><tbody><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">Negative Broad</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">-running shoes</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Blocks search queries containing ALL negative terms, regardless of the order they appear in the query.</td><td class=\"p-2.5 font-semibold text-rose-500\">NO (Does NOT match 'run shoes' or 'running shoe')</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">Negative Phrase</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">-\"running shoes\"</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Blocks search queries containing the exact phrase in the EXACT order, even if additional words precede or follow it.</td><td class=\"p-2.5 font-semibold text-rose-500\">NO (Does NOT match singular 'running shoe')</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">Negative Exact</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">-[running shoes]</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Blocks search queries that match the exact phrase with NO additional words before or after.</td><td class=\"p-2.5 font-semibold text-rose-500\">NO (Does NOT match 'blue running shoes')</td></tr></tbody></table><p><strong>Crucial Rule:</strong> Because negative keywords do NOT match close variants, plurals, or misspellings, you must manually add both singular and plural forms (e.g., <code>free</code> and <code>frees</code>, <code>course</code> and <code>courses</code>, <code>job</code> and <code>jobs</code>) to your negative lists.</p>",
        keyTakeaways: [
          "Negative keywords NEVER match close variants, plurals, or misspellings in Google Ads.",
          "You must explicitly add both singular and plural forms to comprehensive negative lists.",
          "Negative broad requires all words to be present in any order; negative phrase requires the exact sequence.",
        ],
      },
      {
        heading: "Account-Level vs Campaign-Level vs Ad Group-Level Negatives",
        content:
          "<p>To organize your paid search architecture effectively, apply negative keywords across three distinct structural tiers:</p><ul><li><strong>Account-Level Negative Lists:</strong> Universal negatives that apply to every campaign across the entire account (e.g., adult terms, piracy, crack, serial key, torrent, job applicant keywords).</li><li><strong>Campaign-Level Negatives:</strong> Category-specific negatives that prevent cross-campaign cannibalization (e.g., adding <code>mens</code> as a negative in your Women's Footwear campaign).</li><li><strong>Ad Group-Level Negatives:</strong> Granular negatives used to sculpt traffic between exact single-keyword ad groups (SKAGs) or tightly themed ad groups (STAGs).</li></ul>",
        keyTakeaways: [
          "Use shared negative keyword lists at the account level to protect all current and future campaigns.",
          "Use campaign-level negatives to isolate traffic between distinct product lines and match types.",
          "Review Search Terms reports weekly to extract new converting queries and isolate negative waste.",
        ],
      },
      {
        heading: "Google Ads Limits and Formatting Rules",
        content:
          "<p>When uploading negative keywords via the Google Ads Web Interface or Google Ads Editor, ensure your list complies with technical platform limits:</p><ul><li><strong>Maximum 10 words per negative keyword:</strong> Google Ads rejects negative keywords exceeding 10 words.</li><li><strong>Maximum 80 characters per negative keyword:</strong> Any keyword longer than 80 characters throws an upload error.</li><li><strong>Illegal Symbols:</strong> Characters like <code>@</code>, <code>%</code>, <code>*</code>, <code>^</code>, <code>~</code>, <code>(</code>, <code>)</code>, <code>=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>!</code>, <code>?</code>, <code>;</code>, <code>:</code>, <code>\\</code>, <code>|</code>, <code>{</code>, <code>}</code> are strictly prohibited.</li><li><strong>Maximum 5,000 negative keywords per shared list:</strong> An account can contain up to 20 shared negative lists.</li></ul>",
        keyTakeaways: [
          "Keep negative keywords under 10 words and 80 characters.",
          "Strip invalid punctuation and symbols before uploading to Google Ads Editor.",
          "Organize universal negatives into shared lists (up to 5,000 keywords per list).",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Do negative keywords in Google Ads match misspellings and plural forms?",
      answer:
        "No. Unlike standard positive targeting keywords where Google automatically matches close variants and misspellings, negative keywords only block exact character sequences. If you add 'course' as a negative keyword, your ad can still trigger for searches containing 'courses' or 'corse'. Always include both singular and plural forms in your negative lists.",
    },
    {
      question: "What is the difference between Negative Broad, Negative Phrase, and Negative Exact?",
      answer:
        "Negative Broad (-keyword) blocks queries that contain all specified negative terms anywhere in the search, regardless of order. Negative Phrase (-\"keyword phrase\") blocks queries containing the exact word sequence in that specific order. Negative Exact (-[keyword]) only blocks the query if the user searches for that exact term with no extra words before or after.",
    },
    {
      question: "Why does Google Ads reject some negative keywords during CSV upload?",
      answer:
        "Google Ads rejects negative keywords if they exceed 10 words in length, exceed 80 characters, or contain illegal characters such as @, %, *, ^, ~, +, =, <, >, !, ?, ;, :, or brackets not used for exact match formatting. Our scrubber automatically sanitizes these symbols and flags over-limit lines.",
    },
    {
      question: "How do I import the cleaned negative keyword CSV into Google Ads Editor?",
      answer:
        "In Google Ads Editor, navigate to 'Keywords and Targeting' > 'Keywords, Negative', click 'Make multiple changes', select 'My data includes columns for campaigns and/or ad groups', paste the CSV contents generated by this tool, and click 'Process'.",
    },
    {
      question: "How many negative keywords can I add to a single Google Ads campaign?",
      answer:
        "You can add up to 10,000 negative keywords directly to a campaign or ad group, and attach up to 20 shared negative keyword lists (with up to 5,000 keywords per list) per account, allowing for up to 100,000+ total negative keywords across an account.",
    },
    {
      question: "Is this PPC Negative Keyword Scrubber completely private and secure?",
      answer:
        "Yes. All deduplication, character sanitization, and match-type formatting execute 100% client-side in your web browser. No keyword lists or proprietary campaign data are transmitted over the network or saved to any server.",
    },
  ],
};
