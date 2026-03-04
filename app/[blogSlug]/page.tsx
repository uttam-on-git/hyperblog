type Props = {
  params: Promise<{
    blogSlug: string
  }>
}

async function getBlog(slug: string) {
  const res = await fetch(
    `http://localhost:3000/api/blog?slug=${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return null
  return res.json()
}

export default async function BlogPage({ params }: Props) {
  const { blogSlug } = await params
  const blog = await getBlog(blogSlug)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <p className="text-gray-500 mb-6">
          {blog.author} • {blog.date}
        </p>

        <p className="text-lg leading-relaxed">
          {blog.content}
        </p>
      </article>
    </main>
  )
}