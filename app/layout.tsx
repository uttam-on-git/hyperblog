import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "HyperBlog",
    template: "%s | HyperBlog",
  },
  description:
    "Multi-blog platform demo with dynamic routing and proxy rewrites.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HyperBlog",
    description:
      "Multi-blog platform demo with dynamic routing, server rendering, and SEO.",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
