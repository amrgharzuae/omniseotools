import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Shield, Sparkles, Share2, Search, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        
        {/* Semantic 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Overview & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo size={32} />
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {siteConfig.description} Free, high-performance SEO & web utilities engineered for marketers, founders, and developers.
            </p>
            <div className="space-y-2 text-xs text-indigo-600 dark:text-indigo-400 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <Shield className="h-3.5 w-3.5 shrink-0" />
                <span>100% Free & Client-Side Private</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>Zero Server-Side Storage</span>
              </div>
            </div>
          </div>

          {/* Column 2: Social & OpenGraph Tools (4 Direct Links) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Share2 className="h-3.5 w-3.5 text-indigo-500" />
              Social & OpenGraph Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/twitter-card-preview"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Twitter Card Previewer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/linkedin-link-preview"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  LinkedIn Link Preview
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/facebook-open-graph-debugger"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Facebook Open Graph Debugger
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/discord-embed-generator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Discord Embed Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SERP & Search Tools (3 Direct Links) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Search className="h-3.5 w-3.5 text-indigo-500" />
              SERP & Search Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/meta-title-pixel-checker"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Meta Title Pixel Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/meta-description-length-counter"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Meta Description Length Counter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/google-serp-simulator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Google SERP Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Copywriting, Technical & Legal (3 Direct Tools + Legal Links) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
              <FileText className="h-3.5 w-3.5 text-indigo-500" />
              Copywriting & Technical
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/flesch-kincaid-calculator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Flesch-Kincaid Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/keyword-density-checker"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Keyword Density Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/open-graph-meta-generator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                >
                  Open Graph Meta Generator
                </Link>
              </li>
            </ul>

            {/* Sub-section: Legal Links */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Policies & Info
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                <Link
                  href="/privacy-policy"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link
                  href="/terms"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms
                </Link>
                <span>•</span>
                <Link
                  href="/about"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for speed, privacy & 100% crawlable search indexing
          </p>
        </div>

      </div>
    </footer>
  );
}
