"use client";

import React from "react";
import dynamic from "next/dynamic";

const MicroFeedbackDrawer = dynamic(
  () => import("./MicroFeedbackDrawer").then((mod) => mod.MicroFeedbackDrawer),
  {
    ssr: false,
    loading: () => null,
  }
);

export function DynamicFeedbackDrawer() {
  return <MicroFeedbackDrawer />;
}

export default DynamicFeedbackDrawer;
