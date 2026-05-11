import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer, { slugifyHeading } from "./PortableTextRenderer";
import BlogMobileToc from "./BlogMobileToc";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function extractHeadings(body = []) {
  return body
    .filter(
      (block) =>
        block?._type === "block" &&
        block?.style === "h2" &&
        Array.isArray(block?.children)
    )
    .map((block) => {
      const text = block.children
        .map((c) => (c?._type === "span" ? c.text || "" : ""))
        .join("")
        .trim();
      if (!text) return null;
      return { id: slugifyHeading(text), text };
    })
    .filter(Boolean);
}

export default function BlogPostContent({ post }) {
  if (!post) return null;

  const cover = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1920).height(1080).quality(85).url()
    : null;

  const headings = extractHeadings(post.body);

  return (
    <main className="w-full bg-[#dfdfdf]">
      <article className="mx-auto w-full sm:w-[90%] px-4 py-8 sm:px-0 sm:py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
        >
          <span aria-hidden="true">←</span> Back to blog
        </Link>

        <header className="mt-6 grid grid-cols-1 items-start gap-4 md:gap-8 border-b border-black/10 pb-10 md:grid-cols-2">
          {cover ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={cover}
                alt={post.coverImage?.alt || post.title || "Blog cover"}
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className={cover ? "" : "md:col-span-2"}>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-900">
              {post.title}
            </h1>

            <div className="sm:mt-4 mt-2 flex flex-wrap items-center gap-1.5 sm:gap-3 text-xs sm:text-sm text-gray-600">
              {post.publishedAt ? (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              ) : null}
              {post.readTime ? (
                <>
                  <span aria-hidden="true">•</span>
                  <span>{post.readTime} min read</span>
                </>
              ) : null}
            </div>
          </div>
        </header>

        <BlogMobileToc headings={headings} />

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {headings.length > 0 ? (
            <aside className="hidden md:order-2 md:col-span-4 md:block">
              <div className="md:sticky md:top-[40px]">
                <h3 className="text-base font-bold text-gray-900">
                  Table of Contents
                </h3>
                <ol className="mt-2 space-y-2">
                  {headings.map((h, i) => (
                    <li
                      key={h.id}
                      className="flex items-baseline font-semibold gap-3 text-xs leading-5"
                    >
                      <span className="w-5 shrink-0 text-right text-xs text-gray-700">
                        {i + 1}
                      </span>
                      <a
                        href={`#${h.id}`}
                        className="text-gray-800 hover:underline underline-offset-2 hover:text-secondary"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          ) : null}

          <div className="min-w-0 md:order-1 md:col-span-8">
            <PortableTextRenderer value={post.body} />
          </div>
        </div>
      </article>
    </main>
  );
}
