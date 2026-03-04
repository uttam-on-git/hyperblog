# HyperBlog - Multi-Blog Next.js Demo

This repository implements a multi-blog platform using subfolder routing with Next.js App Router.

## Routes

Dynamic route implementation:
- `/[blogSlug]`

Supported blog slugs:
- `/tech-blog`
- `/travel-blog`
- `/design-blog`

Implementation: [app/[blogSlug]/page.tsx](app/[blogSlug]/page.tsx)

## Rendering Choice

Rendering mode is **Server Components + static pre-rendering for known slugs**.

- Blog pages are Server Components (no client directive on route file).
- `generateStaticParams` pre-renders the three known blog routes at build time.
- `dynamicParams = false` prevents runtime generation of unknown slugs.

Why:
- Keeps JS bundle small for content pages.
- Delivers HTML directly for SEO and fast first render.

## Middleware / Proxy Logic

File: [proxy.ts](proxy.ts)

Behavior:
- Reads request header `x-blog-domain`.
- Maps values to slug routes:
  - `tech -> /tech-blog`
  - `travel -> /travel-blog`
  - `design -> /design-blog`
- Uses `NextResponse.rewrite(...)` for internal routing.
- Matcher is set to `/` to simulate entry via root without real domain setup.

Example:
- Request `GET /` with header `x-blog-domain: tech` is internally rewritten to `/tech-blog`.

## SEO Approach

SEO is fully server-rendered through the Metadata API.

- Route-level metadata in `generateMetadata`:
  - title
  - description
  - canonical URL
  - Open Graph metadata
  - Twitter metadata
- Proper semantic heading structure (`h1`) per blog page.
- Content is server-rendered and visible in page source.

Files:
- [app/[blogSlug]/page.tsx](app/[blogSlug]/page.tsx)
- [app/layout.tsx](app/layout.tsx)

## Performance Decisions

1. Dynamic import for interactive client-only comments editor:
   - `dynamic(() => import("./HeavyEditor"), { ssr: false })`
2. Keep main blog content server-rendered to avoid unnecessary hydration.
3. Pre-render known slugs with `generateStaticParams`.

Files:
- [components/HeavyEditorWrapper.tsx](components/HeavyEditorWrapper.tsx)
- [components/HeavyEditor.tsx](components/HeavyEditor.tsx)

## Data Fetching / Mock API

Mock API endpoint is implemented for server-side data handling:
- `GET /api/blog?slug=tech-blog`

Behavior:
- Returns blog JSON for valid slug.
- Returns 400 if `slug` is missing.
- Returns 404 if slug does not exist.

Files:
- [app/api/blog/route.ts](app/api/blog/route.ts)
- [lib/blogs.ts](lib/blogs.ts)

## Project Structure

- `app/` - routes, layout, API route handlers
- `components/` - UI components (including lazy-loaded client component)
- `lib/` - reusable mock blog data access
- `proxy.ts` - request header to route rewrite logic

## Scaling Plan (Bonus)

To support main domain, subdomains, and subfolder blogs at scale:

1. Domain resolution layer
- Store tenant mapping in DB/cache: host/subdomain/header -> tenant config.
- Resolve tenant in proxy and attach tenant id in request headers.

2. Routing strategy
- Keep App Router dynamic segment (`/[blogSlug]`) for subfolder URLs.
- Add host-based rewriting for subdomains (`tech.example.com -> /tech-blog` or tenant-aware path).

3. Data isolation
- Move from static `lib/blogs.ts` to tenant-aware data service.
- Fetch by `(tenantId, blogSlug)`.

4. Caching
- Use route segment caching/revalidation per tenant.
- Add CDN caching for public blog pages.

5. SEO at scale
- Generate canonical URLs based on active host strategy.
- Produce per-tenant sitemap/robots and metadata.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
