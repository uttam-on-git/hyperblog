// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

const blogMap: Record<string, string> = {
  tech: 'tech-blog',
  travel: 'travel-blog',
  design: 'design-blog',
};

export function proxy(request: NextRequest) {
  const domainHeader = request.headers.get('x-blog-domain')?.toLowerCase().trim();

  if (domainHeader && blogMap[domainHeader]) {
    const targetSlug = blogMap[domainHeader];
    // internal rewrite -> browser URL stays / but serves /[blogSlug]
    return NextResponse.rewrite(new URL(`/${targetSlug}`, request.url));
  }

  return NextResponse.next();
}

// run only on root path
export const config = {
  matcher: ['/'],
};