import { NextResponse } from "next/server";

type Blog = {
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
    description: "Exploring the next generation of web technologies.",
    content:
      "Modern web development is evolving rapidly with frameworks like Next.js enabling server rendering, streaming, and edge computing.",
    author: "Romendra",
    date: "2026-03-04",
  },

  "travel-blog": {
    slug: "travel-blog",
    title: "Exploring the Mountains",
    description: "A journey through the world's most beautiful mountains.",
    content:
      "Travel opens the mind. From the Himalayas to the Alps, every mountain range tells a unique story.",
    author: "Romendra",
    date: "2026-03-04",
  },

  "design-blog": {
    slug: "design-blog",
    title: "Minimalist Design Principles",
    description: "How simplicity improves user experience.",
    content:
      "Minimalist design focuses on clarity, usability, and removing unnecessary elements to create better digital experiences.",
    author: "Romendra",
    date: "2026-03-04",
  },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 },
      );
    }

    const blog = blogs[slug];

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Blog API error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
