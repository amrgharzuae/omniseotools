#!/usr/bin/env node

/**
 * submit-awesome-pr.mjs
 * 
 * Standalone automation script to fork target GitHub Awesome repositories,
 * insert OmniSEO into the appropriate README section, and open a Pull Request.
 * 
 * Usage:
 *   node scripts/submit-awesome-pr.mjs --owner <owner> --repo <repo> --section <section> [options]
 * 
 * Options:
 *   --owner, -o       Target repository owner (required)
 *   --repo, -r        Target repository name (required)
 *   --section, -s     Heading inside README.md under which to append the tool (required)
 *   --line, -l        Markdown line to insert (optional, has default)
 *   --branch, -b      Working branch name (default: "add-omniseo-tool")
 *   --title           Pull Request title (default: "Add OmniSEO to developer / SEO tools")
 *   --body            Pull Request body (default provided)
 *   --config, -c      Path to a JSON file containing an array of target repo objects
 *   --dry-run, -d     Simulate operations and display diff without mutating GitHub
 *   --yes, -y         Skip interactive confirmation prompts
 *   --help, -h        Display help and usage instructions
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { parseArgs } from "node:util";
import { Octokit } from "@octokit/rest";

// ANSI Color Helpers
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
  bgBlue: "\x1b[44m",
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✔${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✖${colors.reset} ${msg}`),
  step: (step, total, msg) =>
    console.log(`\n${colors.bold}${colors.magenta}[${step}/${total}]${colors.reset} ${colors.bold}${msg}${colors.reset}`),
};

const DEFAULT_LINE_TO_INSERT =
  "- [OmniSEO](https://omniseotools.com) - Fast, client-side social card previewer and Google SERP pixel ruler.";

const DEFAULT_PR_TITLE = "Add OmniSEO to developer / SEO tools";

const DEFAULT_PR_BODY =
  "OmniSEO is a free, zero-latency browser utility for previewing social media cards (Twitter, LinkedIn) and Google SERP pixel limits. Thank you for maintaining this list!";

const DEFAULT_BRANCH_NAME = "add-omniseo-tool";

// Load .env or .env.local if GITHUB_TOKEN is not in environment
function loadEnvVariables() {
  if (process.env.GITHUB_TOKEN) return;

  const envFiles = [".env.local", ".env"];
  for (const envFile of envFiles) {
    const filePath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }
  }
}

// Display Help Menu
function showHelp() {
  console.log(`
${colors.bold}OmniSEO Awesome List PR Submitter${colors.reset}
Automate submitting OmniSEO to curated GitHub awesome lists via Octokit.

${colors.bold}Usage:${colors.reset}
  node scripts/submit-awesome-pr.mjs [options]

${colors.bold}Options:${colors.reset}
  --owner, -o <owner>        Target repo owner (e.g., sindresorhus)
  --repo, -r <repo>          Target repository name (e.g., awesome-nodejs)
  --section, -s <section>    Heading in README under which to insert (e.g., "SEO" or "Developer Tools")
  --line, -l <line>          Markdown line to insert (default: OmniSEO link & description)
  --branch, -b <branch>      Branch name on fork (default: "${DEFAULT_BRANCH_NAME}")
  --title <title>            Pull request title (default: "${DEFAULT_PR_TITLE}")
  --body <body>              Pull request body (default provided)
  --config, -c <file.json>   JSON file containing an array of target repos
  --dry-run, -d              Dry-run mode: verify headings and display diff without creating PR
  --yes, -y                  Non-interactive: skip confirmation prompts
  --help, -h                 Show this help message

${colors.bold}Example:${colors.reset}
  node scripts/submit-awesome-pr.mjs \\
    --owner sindresorhus \\
    --repo awesome-nodejs \\
    --section "SEO" \\
    --dry-run
`);
}

/**
 * Locate section heading in Markdown and insert line at the end of that section's items.
 */
export function insertLineIntoMarkdown(markdownContent, targetSection, lineToInsert) {
  const normalizedTarget = targetSection
    .replace(/^#+\s*/, "")
    .trim()
    .toLowerCase();

  const lines = markdownContent.split("\n");
  let headingIndex = -1;
  let headingLevel = 0;
  let headingRawText = "";

  // 1. Find the target section heading
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const cleanText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Strip markdown links if in heading
        .trim()
        .toLowerCase();

      if (cleanText === normalizedTarget || cleanText.includes(normalizedTarget)) {
        headingIndex = i;
        headingLevel = level;
        headingRawText = lines[i];
        break;
      }
    }
  }

  if (headingIndex === -1) {
    throw new Error(
      `Could not find section heading matching "${targetSection}" in README.md`
    );
  }

  // 2. Determine section end boundary (next heading of <= headingLevel or EOF)
  let sectionEndIndex = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      if (level <= headingLevel) {
        sectionEndIndex = i;
        break;
      }
    }
  }

  // 3. Check if tool or URL is already present in this section or file
  const sectionSlice = lines.slice(headingIndex, sectionEndIndex).join("\n");
  if (
    sectionSlice.includes("omniseotools.com") ||
    sectionSlice.toLowerCase().includes("omniseo")
  ) {
    return {
      updatedContent: markdownContent,
      alreadyExists: true,
      headingFound: headingRawText,
      insertionIndex: -1,
      diffPreview: "Tool already listed in section. No changes made.",
    };
  }

  // 4. Find the best insertion point within the section.
  // We want to insert after the last non-empty list item (or line) in this section before trailing blanks / next heading.
  let insertAt = sectionEndIndex;

  // Scan backwards from sectionEndIndex - 1 to find the last item or content
  for (let i = sectionEndIndex - 1; i > headingIndex; i--) {
    const line = lines[i].trim();
    if (line.length > 0) {
      // If line is a list item or content, we append after it
      insertAt = i + 1;
      break;
    }
  }

  if (insertAt <= headingIndex) {
    insertAt = headingIndex + 1;
  }

  // 5. Construct new lines array
  const newLines = [...lines];
  newLines.splice(insertAt, 0, lineToInsert);

  const updatedContent = newLines.join("\n");

  // 6. Generate a contextual diff preview
  const contextStart = Math.max(0, insertAt - 3);
  const contextEnd = Math.min(newLines.length, insertAt + 4);
  const previewLines = [];

  for (let i = contextStart; i < contextEnd; i++) {
    if (i === insertAt) {
      previewLines.push(`${colors.green}+ ${newLines[i]}${colors.reset}`);
    } else {
      previewLines.push(`  ${newLines[i]}`);
    }
  }

  return {
    updatedContent,
    alreadyExists: false,
    headingFound: headingRawText,
    insertionIndex: insertAt,
    diffPreview: previewLines.join("\n"),
  };
}

/**
 * Process a single target repository
 */
async function processTargetRepo({
  octokit,
  authUsername,
  owner,
  repo,
  targetSection,
  lineToInsert = DEFAULT_LINE_TO_INSERT,
  branchName = DEFAULT_BRANCH_NAME,
  prTitle = DEFAULT_PR_TITLE,
  prBody = DEFAULT_PR_BODY,
  isDryRun = false,
  autoConfirm = false,
  rl,
}) {
  console.log(`\n${colors.bold}${colors.bgBlue} Target: ${owner}/${repo} ${colors.reset}`);
  log.info(`Target Section: "${targetSection}"`);
  log.info(`Line to insert: "${lineToInsert}"`);

  const totalSteps = isDryRun ? 2 : 5;

  // Step 1: Fetch upstream repo details and README
  log.step(1, totalSteps, `Fetching ${owner}/${repo} metadata & README.md...`);
  const { data: upstreamRepo } = await octokit.rest.repos.get({ owner, repo });
  const defaultBranch = upstreamRepo.default_branch;
  log.info(`Default branch: ${colors.bold}${defaultBranch}${colors.reset}`);

  // Fetch README
  let readmeData;
  try {
    const res = await octokit.rest.repos.getReadme({
      owner,
      repo,
      ref: defaultBranch,
    });
    readmeData = res.data;
  } catch (err) {
    throw new Error(`Failed to fetch README from ${owner}/${repo}: ${err.message}`);
  }

  const readmePath = readmeData.path;
  const rawContent = Buffer.from(readmeData.content, "base64").toString("utf-8");
  log.success(`Found ${readmePath} (${rawContent.length} bytes)`);

  // Step 2: Parse and calculate diff
  log.step(2, totalSteps, `Analyzing README structure for section "${targetSection}"...`);
  const result = insertLineIntoMarkdown(rawContent, targetSection, lineToInsert);

  if (result.alreadyExists) {
    log.warn(`OmniSEO is already present in ${owner}/${repo} -> section "${result.headingFound}". Skipping.`);
    return { success: true, skipped: true, reason: "Already exists" };
  }

  log.success(`Located section heading: "${colors.bold}${result.headingFound}${colors.reset}"`);
  console.log(`\n${colors.dim}--- [Diff Preview] ---${colors.reset}`);
  console.log(result.diffPreview);
  console.log(`${colors.dim}----------------------${colors.reset}\n`);

  if (isDryRun) {
    log.info(`${colors.yellow}[DRY-RUN]${colors.reset} Would create branch '${branchName}' and submit PR:`);
    console.log(`  Title: ${prTitle}`);
    console.log(`  Body:  ${prBody}`);
    log.success(`Dry run completed for ${owner}/${repo}. No modifications were made.`);
    return { success: true, dryRun: true };
  }

  // Interactive Confirmation if not auto-confirmed
  if (!autoConfirm && rl) {
    const answer = await rl.question(
      `${colors.bold}${colors.yellow}? Open Pull Request to ${owner}/${repo}? (y/N): ${colors.reset}`
    );
    if (answer.trim().toLowerCase() !== "y" && answer.trim().toLowerCase() !== "yes") {
      log.warn(`Submission cancelled for ${owner}/${repo}.`);
      return { success: false, cancelled: true };
    }
  }

  // Step 3: Fork repository
  log.step(3, totalSteps, `Ensuring fork on @${authUsername}'s account...`);
  let forkData;
  try {
    const existingFork = await octokit.rest.repos.get({
      owner: authUsername,
      repo,
    });
    forkData = existingFork.data;
    log.info(`Existing fork found at ${forkData.html_url}`);
  } catch {
    log.info(`Creating new fork of ${owner}/${repo}...`);
    const createdFork = await octokit.rest.repos.createFork({
      owner,
      repo,
    });
    forkData = createdFork.data;

    // Wait for GitHub fork creation propagation
    let ready = false;
    for (let attempt = 1; attempt <= 8; attempt++) {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        await octokit.rest.repos.get({ owner: authUsername, repo });
        ready = true;
        break;
      } catch {
        log.info(`Waiting for fork to initialize (attempt ${attempt}/8)...`);
      }
    }
    if (!ready) {
      throw new Error(`Timeout waiting for fork ${authUsername}/${repo} to become available.`);
    }
  }
  log.success(`Fork ready: ${forkData.html_url}`);

  // Step 4: Create / Update branch and commit changes
  log.step(4, totalSteps, `Preparing branch '${branchName}' and committing updated README...`);

  // Get latest commit SHA of upstream default branch
  const { data: upstreamRef } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${defaultBranch}`,
  });
  const baseSha = upstreamRef.object.sha;

  // Check if branch exists on fork
  let branchExists = false;
  try {
    await octokit.rest.git.getRef({
      owner: authUsername,
      repo,
      ref: `heads/${branchName}`,
    });
    branchExists = true;
  } catch {
    branchExists = false;
  }

  if (branchExists) {
    log.info(`Branch '${branchName}' already exists on fork. Resetting to upstream/${defaultBranch} (${baseSha.slice(0, 7)})...`);
    await octokit.rest.git.updateRef({
      owner: authUsername,
      repo,
      ref: `heads/${branchName}`,
      sha: baseSha,
      force: true,
    });
  } else {
    log.info(`Creating branch '${branchName}' on fork at ${baseSha.slice(0, 7)}...`);
    await octokit.rest.git.createRef({
      owner: authUsername,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });
  }

  // Get current file SHA on the new branch in the fork
  const { data: forkFile } = await octokit.rest.repos.getContent({
    owner: authUsername,
    repo,
    path: readmePath,
    ref: branchName,
  });

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: authUsername,
    repo,
    path: readmePath,
    message: `docs: add OmniSEO to ${targetSection}`,
    content: Buffer.from(result.updatedContent, "utf-8").toString("base64"),
    branch: branchName,
    sha: forkFile.sha,
  });
  log.success(`Committed update to ${readmePath} on branch '${branchName}'.`);

  // Step 5: Open Pull Request
  log.step(5, totalSteps, `Opening Pull Request to ${owner}/${repo}:${defaultBranch}...`);

  // Check if PR already exists
  const { data: existingPrs } = await octokit.rest.pulls.list({
    owner,
    repo,
    head: `${authUsername}:${branchName}`,
    state: "open",
  });

  if (existingPrs.length > 0) {
    const prUrl = existingPrs[0].html_url;
    log.warn(`An open PR already exists for this branch: ${colors.bold}${prUrl}${colors.reset}`);
    return { success: true, prUrl, alreadyOpen: true };
  }

  const { data: pr } = await octokit.rest.pulls.create({
    owner,
    repo,
    title: prTitle,
    body: prBody,
    head: `${authUsername}:${branchName}`,
    base: defaultBranch,
  });

  log.success(`${colors.bold}Pull Request successfully opened!${colors.reset}`);
  console.log(`\n  🔗 ${colors.bold}${colors.green}${pr.html_url}${colors.reset}\n`);

  return { success: true, prUrl: pr.html_url };
}

/**
 * Main execution entry point
 */
async function main() {
  loadEnvVariables();

  // Command-line argument options
  const options = {
    owner: { type: "string", short: "o" },
    repo: { type: "string", short: "r" },
    section: { type: "string", short: "s" },
    line: { type: "string", short: "l" },
    branch: { type: "string", short: "b", default: DEFAULT_BRANCH_NAME },
    title: { type: "string", default: DEFAULT_PR_TITLE },
    body: { type: "string", default: DEFAULT_PR_BODY },
    config: { type: "string", short: "c" },
    "dry-run": { type: "boolean", short: "d", default: false },
    yes: { type: "boolean", short: "y", default: false },
    help: { type: "boolean", short: "h", default: false },
  };

  let values;
  try {
    const parsed = parseArgs({ options, allowPositionals: true });
    values = parsed.values;
  } catch (err) {
    log.error(`Argument error: ${err.message}`);
    showHelp();
    process.exit(1);
  }

  if (values.help) {
    showHelp();
    process.exit(0);
  }

  const isDryRun = Boolean(values["dry-run"]);
  const autoConfirm = Boolean(values.yes);

  // Authenticate GitHub client
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    if (!isDryRun) {
      log.error("GITHUB_TOKEN environment variable is missing.");
      console.log(`\nTo set your token:\n  export GITHUB_TOKEN="ghp_yourPersonalAccessToken"\nor add GITHUB_TOKEN=... to your .env.local file.\n`);
      process.exit(1);
    } else {
      log.warn("Running in DRY-RUN mode without GITHUB_TOKEN (unauthenticated rate limits may apply).");
    }
  }

  const octokit = new Octokit({ auth: token || undefined });
  let authUsername = "authenticated-user";

  if (token) {
    try {
      const { data: user } = await octokit.rest.users.getAuthenticated();
      authUsername = user.login;
      log.info(`Authenticated as: ${colors.bold}@${authUsername}${colors.reset}`);
    } catch (err) {
      log.error(`Authentication failed: ${err.message}`);
      process.exit(1);
    }
  }

  // Collect target list
  const targets = [];
  const rl = readline.createInterface({ input, output });

  try {
    if (values.config) {
      const configPath = path.resolve(process.cwd(), values.config);
      if (!fs.existsSync(configPath)) {
        log.error(`Config file not found: ${configPath}`);
        process.exit(1);
      }
      const rawJson = fs.readFileSync(configPath, "utf-8");
      const parsedTargets = JSON.parse(rawJson);
      if (!Array.isArray(parsedTargets)) {
        throw new Error("Config file must contain a JSON array of targets.");
      }
      targets.push(...parsedTargets);
    } else if (values.owner && values.repo && values.section) {
      targets.push({
        owner: values.owner,
        repo: values.repo,
        targetSection: values.section,
        lineToInsert: values.line || DEFAULT_LINE_TO_INSERT,
        branchName: values.branch || DEFAULT_BRANCH_NAME,
        prTitle: values.title || DEFAULT_PR_TITLE,
        prBody: values.body || DEFAULT_PR_BODY,
      });
    } else {
      // Interactive mode if no parameters supplied
      console.log(`\n${colors.bold}Interactive Awesome List Submission Wizard${colors.reset}`);
      const owner = await rl.question(`Repository Owner (e.g. sindresorhus): `);
      const repo = await rl.question(`Repository Name (e.g. awesome-nodejs): `);
      const targetSection = await rl.question(`Target Section heading in README (e.g. SEO): `);

      if (!owner.trim() || !repo.trim() || !targetSection.trim()) {
        log.error("Owner, repo, and section are all required.");
        process.exit(1);
      }

      const customLine = await rl.question(
        `Line to insert (press ENTER for default: "${DEFAULT_LINE_TO_INSERT.slice(0, 40)}..."): `
      );

      targets.push({
        owner: owner.trim(),
        repo: repo.trim(),
        targetSection: targetSection.trim(),
        lineToInsert: customLine.trim() || DEFAULT_LINE_TO_INSERT,
        branchName: values.branch || DEFAULT_BRANCH_NAME,
        prTitle: values.title || DEFAULT_PR_TITLE,
        prBody: values.body || DEFAULT_PR_BODY,
      });
    }

    log.info(`Found ${targets.length} target repository task(s).`);

    const results = [];
    for (const target of targets) {
      try {
        const res = await processTargetRepo({
          octokit,
          authUsername,
          owner: target.owner,
          repo: target.repo,
          targetSection: target.targetSection || target.section,
          lineToInsert: target.lineToInsert || DEFAULT_LINE_TO_INSERT,
          branchName: target.branchName || values.branch || DEFAULT_BRANCH_NAME,
          prTitle: target.prTitle || values.title || DEFAULT_PR_TITLE,
          prBody: target.prBody || values.body || DEFAULT_PR_BODY,
          isDryRun,
          autoConfirm,
          rl,
        });
        results.push({ target: `${target.owner}/${target.repo}`, ...res });
      } catch (err) {
        log.error(`Failed processing ${target.owner}/${target.repo}: ${err.message}`);
        results.push({ target: `${target.owner}/${target.repo}`, success: false, error: err.message });
      }
    }

    // Summary
    console.log(`\n${colors.bold}═══════════════════ Summary ═══════════════════${colors.reset}`);
    for (const r of results) {
      if (r.dryRun) {
        console.log(`  ${colors.yellow}🔍 ${r.target}${colors.reset} - Dry-run simulated successfully`);
      } else if (r.prUrl) {
        console.log(`  ${colors.green}✔ ${r.target}${colors.reset} -> ${r.prUrl}`);
      } else if (r.skipped) {
        console.log(`  ${colors.dim}⏭ ${r.target}${colors.reset} - Skipped (${r.reason})`);
      } else if (r.cancelled) {
        console.log(`  ${colors.yellow}⏸ ${r.target}${colors.reset} - Cancelled by user`);
      } else {
        console.log(`  ${colors.red}✖ ${r.target}${colors.reset} - Failed (${r.error || "Unknown error"})`);
      }
    }
    console.log(`${colors.bold}═══════════════════════════════════════════════${colors.reset}\n`);
  } finally {
    rl.close();
  }
}

// Execute if run as script
if (process.argv[1] && process.argv[1].endsWith("submit-awesome-pr.mjs")) {
  main().catch((err) => {
    log.error(`Fatal error: ${err.message}`);
    process.exit(1);
  });
}
