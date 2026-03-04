import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeavyEditorWrapper from "@/components/HeavyEditorWrapper";
import { getAllBlogSlugs, getBlog } from "@/lib/blogs";

type Props = {
  params: Promise<{
    blogSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((blogSlug) => ({ blogSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug } = await params;
  const blog = getBlog(blogSlug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "Requested blog does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: `/${blog.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { blogSlug } = await params;
  const blog = getBlog(blogSlug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto max-w-3xl rounded-xl border border-(--surface-border) bg-(--surface) px-6 py-10 md:px-10">
        <header className="mb-8 border-b border-(--surface-border) pb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-accent">
            {blog.slug}
          </p>
          <h1 className="mb-3 text-4xl font-bold">{blog.title}</h1>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {blog.author} | <time dateTime={blog.date}>{blog.date}</time>
          </p>
        </header>

        <p className="text-lg leading-8 text-gray-800 dark:text-gray-200">{blog.content}</p>

        <section aria-label="Comments">
          <HeavyEditorWrapper />
        </section>
      </article>
    </main>
  );
}
