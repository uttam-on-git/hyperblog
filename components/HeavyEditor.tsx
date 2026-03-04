"use client"

import { useState } from "react"

export default function HeavyEditor() {
  const [comment, setComment] = useState("")

  return (
    <div className="mt-12 border-t border-(--surface-border) pt-8">
      <h2 className="mb-4 text-2xl font-semibold">
        Comments Section
      </h2>

      <textarea
        className="w-full rounded-lg border border-(--surface-border) bg-transparent p-3 outline-none focus:border-accent"
        rows={4}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="mt-3 rounded bg-foreground px-4 py-2 text-background">
        Post Comment
      </button>
    </div>
  )
}
