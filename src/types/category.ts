export type ToolCategoryId = 
  | "seo" 
  | "marketing" 
  | "developer" 
  | "social" 
  | "content";

export interface CategoryDefinition {
  id: ToolCategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  toolCount?: number;
}
