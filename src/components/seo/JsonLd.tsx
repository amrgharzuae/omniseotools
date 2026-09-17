import React from "react";

interface JsonLdProps {
  schema?: Record<string, any> | Array<Record<string, any> | null | undefined> | null;
}

export function JsonLd({ schema }: JsonLdProps) {
  if (!schema) return null;

  // Filter out any null/undefined items if array
  const cleanSchema = Array.isArray(schema)
    ? schema.filter((item): item is Record<string, any> => Boolean(item))
    : schema;

  if (Array.isArray(cleanSchema) && cleanSchema.length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}
