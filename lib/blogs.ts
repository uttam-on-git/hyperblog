export type Blog = {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
};

const blogs: Record<string, Blog> = {
  "tech-blog": {
    slug: "tech-blog",
    title: "Future of Web Development",
    description: "Exploring modern web technologies",
    content:
      "Next.js enables server rendering, streaming and edge execution for modern web applications.",
    author: "Romendra",
    date: "2026-03-04",
  },
  "travel-blog": {
    slug: "travel-blog",
    title: "Exploring the Mountains",
    description: "Stories from mountain adventures",
    content:
      "Mountains inspire exploration and curiosity across cultures and generations.",
    author: "Romendra",
    date: "2026-03-04",
  },
  "design-blog": {
    slug: "design-blog",
    title: "Minimalist Design",
    description: "Principles of clean interface design",
    content:
      "Minimalist design focuses on clarity, usability and removing unnecessary elements.",
    author: "Romendra",
    date: "2026-03-04",
  },
};

export function getBlog(slug: string): Blog | null {
  return blogs[slug] ?? null;
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogs);
}
