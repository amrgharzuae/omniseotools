import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/config/categories";
import { Logo } from "@/components/ui/Logo";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <Logo size={32} />
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {siteConfig.description} Built for SEO specialists, founders, developers, and growth marketers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <Shield className="h-3.5 w-3.5" />
              <span>100% Free • Client-Side Privacy</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Tool Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/#category-${cat.id}`}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Popular Utilities
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/seo/serp-preview"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Google SERP Previewer
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600">OpenGraph Social Preview (Soon)</span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600">Robots.txt Generator (Soon)</span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600">UTM Campaign Builder (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Legal & Ad Policy
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  About & Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for maximum speed & SEO performance
          </p>
        </div>
      </div>
    </footer>
  );
}
