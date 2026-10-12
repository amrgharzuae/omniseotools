import type { BlueprintCategory } from "@/data/schemas-dataset";

export type SchemaCategory =
  | BlueprintCategory
  | 'E-commerce'
  | 'Local Business'
  | 'Publishing & Media'
  | 'Events & Tech'
  | 'Healthcare'
  | string;

export interface SchemaProperty {
  name: string;
  type: string;
  required: boolean;
  description: string;
  exampleValue?: string;
  googleSupported?: boolean;
}

export interface SchemaPitfall {
  title?: string;
  description?: string;
  severity: 'error' | 'warning' | 'critical' | string;
  gscImpact?: string;
  solution?: string;
  issue?: string;
  fix?: string;
}

export interface SchemaBlueprint {
  slug: string;
  title: string;
  shortTitle?: string;
  name?: string;
  schemaType?: string;
  category: SchemaCategory;
  targetEntity?: string;
  description: string;
  readingTime?: string;
  lastUpdated?: string;
  targetKeywords?: string[];
  jsonLd?: string;
  rawJsonLd?: string;
  jsonLdPayload?: Record<string, unknown> | string;
  jsonLdExample?: Record<string, unknown>;
  properties: SchemaProperty[];
  pitfalls: SchemaPitfall[];
  relatedSlugs: string[];
  useCases?: string[];
  richResultType?: string;
}
