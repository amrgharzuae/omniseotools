import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  readingTime: string;
  featuredTool?: string; // slug of related tool (e.g., "open-graph-meta-generator")
  content: string;
}

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/blog");

/**
 * Ensures blog content directory exists
 */
function ensureBlogDirectory(): boolean {
  return fs.existsSync(POSTS_DIRECTORY);
}

/**
 * Retrieves all blog posts sorted descending by publication date
 */
export function getAllPosts(): BlogPost[] {
  if (!ensureBlogDirectory()) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const mdxFiles = fileNames.filter(
    (fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md")
  );

  const posts: BlogPost[] = mdxFiles
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$|\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPost => post !== null);

  // Sort posts descending by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Retrieves a single blog post by its URL slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    if (!ensureBlogDirectory()) {
      return null;
    }

    const cleanSlug = slug.replace(/\.mdx?$|\.md$/, "");
    let fullPath = path.join(POSTS_DIRECTORY, `${cleanSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(POSTS_DIRECTORY, `${cleanSlug}.md`);
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const timeStats = readingTime(content);

    return {
      slug: cleanSlug,
      title: data.title || "Untitled Article",
      description: data.description || "",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      updatedAt: data.updatedAt
        ? new Date(data.updatedAt).toISOString().split("T")[0]
        : undefined,
      author: {
        name: data.author?.name || "OmniSEO Engineering Team",
        role: data.author?.role || "Technical SEO Specialist",
      },
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: data.readingTime || timeStats.text,
      featuredTool: data.featuredTool,
      content,
    };
  } catch (error) {
    console.error(`Error reading post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Returns all post slugs formatted for generateStaticParams()
 */
export function getAllPostSlugs(): string[] {
  if (!ensureBlogDirectory()) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.mdx?$|\.md$/, ""));
}
