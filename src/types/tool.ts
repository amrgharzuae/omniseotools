import { ToolCategoryId } from "./category";

export interface ToolHowToStep {
  name: string;
  text: string;
}

export interface ToolEditorialSection {
  heading: string;
  content: string;
  keyTakeaways?: string[];
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolGuideContent {
  title: string;
  sections: ToolEditorialSection[];
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  title?: string;
  h1?: string;
  tagline?: string;
  shortDescription: string;
  category: ToolCategoryId;
  icon: string; // Lucide icon identifier
  badge?: "Popular" | "New" | "Pro" | "Updated";
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  featured?: boolean;
  status: "active" | "coming-soon";
  howToSteps?: ToolHowToStep[];
  editorialGuide?: ToolGuideContent;
  guideContent?: ToolGuideContent;
  faqs?: ToolFAQ[];
}

