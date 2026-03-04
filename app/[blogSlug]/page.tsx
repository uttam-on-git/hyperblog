type Props = {
  params: Promise<{
    blogSlug: string
  }>
}

export default async function BlogPage({ params }: Props) {
  const { blogSlug } = await params

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">
          {blogSlug.replace("-", " ")}
        </h1>

        <p className="text-gray-600">
          This is the blog page for <strong>{blogSlug}</strong>.
        </p>
      </div>
    </main>
  )
}