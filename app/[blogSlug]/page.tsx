import { notFound } from "next/navigation";
import HeavyEditorWrapper from "@/components/HeavyEditorWrapper";

type Props = {
  params: Promise<{
    blogSlug: string;
  }>;
};

type Blog = {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
};

async function getBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(`http://localhost:3000/api/blog?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }: Props) {
  const { blogSlug } = await params;
  const blog = await getBlog(blogSlug);

  if (!blog) {
    return {
      title: "Blog Not Found | HyperBlog",
      description: "Requested blog does not exist",
    };
  }

  return {
    title: `${blog.title} | HyperBlog`,
    description: blog.description,
  };
}

/* ---------------- PAGE ---------------- */

export default async function BlogPage({ params }: Props) {
  const { blogSlug } = await params;
  const blog = await getBlog(blogSlug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

          <p className="text-gray-500 text-sm">
            {blog.author} • {blog.date}
          </p>
        </header>

        <p className="text-lg leading-relaxed text-gray-800">{blog.content}</p>
        <HeavyEditorWrapper />
      </article>
    </main>
  );
}
