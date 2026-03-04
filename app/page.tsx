import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-xl border border-(--surface-border) bg-(--surface) p-8">
        <h1 className="mb-4 text-4xl font-bold">HyperBlog Demo</h1>

        <p className="mb-8 text-base leading-7 text-gray-700 dark:text-gray-300">
          This project demonstrates a multi-blog platform built with Next.js App
          Router, including proxy-based routing, SEO metadata, server rendering,
          and performance optimizations.
        </p>

        <div className="space-y-3 text-left">
          <p className="font-semibold">Example blog routes:</p>

          <ul className="space-y-2 text-accent">
            <li>
              <Link className="underline-offset-4 hover:underline" href="/tech-blog">/tech-blog</Link>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/travel-blog">/travel-blog</Link>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/design-blog">/design-blog</Link>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          Tip: test proxy behavior using request header <code>x-blog-domain</code>
        </p>
      </div>
    </main>
  );
}
