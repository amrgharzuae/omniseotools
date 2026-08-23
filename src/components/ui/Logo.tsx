import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export function Logo({
  className,
  size = 36,
  showText = true,
  textClassName,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="OmniSEOTools Logo"
          width={size}
          height={size}
          className="object-contain p-0.5"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors",
              textClassName
            )}
          >
            Omni<span className="text-emerald-600 dark:text-emerald-400">SEO</span>Tools
          </span>
        </div>
      )}
    </div>
  );
}

export function BrandIcon({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="OmniSEOTools"
        width={size}
        height={size}
        className="object-contain p-0.5"
      />
    </div>
  );
}
