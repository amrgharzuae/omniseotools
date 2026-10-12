/**
 * Shared Client-Side Export Utilities for OmniSEOTools Bulk Workbench
 * 100% in-browser processing with zero server dependencies.
 */

/**
 * Escapes an individual cell value according to RFC 4180 rules for CSV.
 */
function escapeCsvCell(cell: string | number | boolean | null | undefined): string {
  if (cell === null || cell === undefined) return '""';
  const str = String(cell);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Escapes an individual cell value for TSV clipboard export (Google Sheets / Airtable).
 * Strips rogue tabs and wraps multiline strings in standard quotes.
 */
function escapeTsvCell(cell: string | number | boolean | null | undefined): string {
  if (cell === null || cell === undefined) return "";
  const str = String(cell);
  if (/[\t\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""').replace(/\t/g, " ")}"`;
  }
  return str;
}

/**
 * Generates and triggers a local file download of a RFC-4180 compliant .csv file.
 * Includes a UTF-8 BOM prefix for seamless Microsoft Excel & Numbers compatibility.
 */
export function downloadCsv(
  filename: string,
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][]
): void {
  if (typeof window === "undefined") return;

  const cleanFilename = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  const headerLine = headers.map(escapeCsvCell).join(",");
  const rowLines = rows.map((row) => row.map(escapeCsvCell).join(","));
  const csvContent = "\uFEFF" + [headerLine, ...rowLines].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", cleanFilename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies structured tabular data directly to the user's system clipboard as Tab-Separated Values (TSV).
 * This enables instant, multi-column paste into Google Sheets, Airtable, Notion, and Excel.
 */
export async function copyToClipboardAsTsv(
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][]
): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.clipboard) return false;

  try {
    const headerLine = headers.map(escapeTsvCell).join("\t");
    const rowLines = rows.map((row) => row.map(escapeTsvCell).join("\t"));
    const tsvContent = [headerLine, ...rowLines].join("\n");

    await navigator.clipboard.writeText(tsvContent);
    return true;
  } catch (err) {
    console.error("Failed to copy TSV to clipboard:", err);
    // Fallback for older browsers or restricted contexts
    try {
      const headerLine = headers.map(escapeTsvCell).join("\t");
      const rowLines = rows.map((row) => row.map(escapeTsvCell).join("\t"));
      const tsvContent = [headerLine, ...rowLines].join("\n");

      const textArea = document.createElement("textarea");
      textArea.value = tsvContent;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  }
}

/**
 * Formats a given URL into a native Google Sheets / Excel `=HYPERLINK("...", "...")` formula.
 * Automatically escapes internal quotation marks.
 */
export function formatGoogleSheetsHyperlink(url: string, anchorText?: string): string {
  if (!url) return "";
  const cleanUrl = url.replace(/"/g, '""');
  const label = anchorText ? anchorText.replace(/"/g, '""') : cleanUrl;
  return `=HYPERLINK("${cleanUrl}", "${label}")`;
}
