import { NextResponse } from "next/server";
import { getBlog } from "@/lib/blogs";

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

    const blog = getBlog(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Blog API error:", error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
