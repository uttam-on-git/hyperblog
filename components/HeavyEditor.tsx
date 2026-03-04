"use client"

import { useState } from "react"

export default function HeavyEditor() {
  const [comment, setComment] = useState("")

  return (
    <div className="mt-16 border-t pt-10">
      <h2 className="text-2xl font-semibold mb-4">
        Comments Section
      </h2>

      <textarea
        className="w-full border rounded-lg p-3"
        rows={4}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="mt-3 bg-black text-white px-4 py-2 rounded">
        Post Comment
      </button>
    </div>
  )
}