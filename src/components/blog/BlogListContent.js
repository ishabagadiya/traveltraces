import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function BlogListContent({ posts = [] }) {
  return (
    <main className="w-full bg-[#dfdfdf] pb-16">
      <section className="mx-auto w-full sm:w-[90%] px-4 py-10 sm:px-0 sm:py-14 flex flex-col gap-2 sm:gap-6">
        <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-900 text-center">
          Blogs by TravelTraces
        </h1>
        <p className="text-base leading-7 text-gray-700 text-center max-w-2xl">
          Explore our curated collection of travel guides, insider tips, and inspiring stories from destinations around the world.
        </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-base text-gray-600 text-center">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => {
              const href = post.slug?.current
                ? `/blog/${post.slug.current}`
                : "#";
              const cover = post.coverImage?.asset
                ? urlFor(post.coverImage).width(800).height(500).quality(80).url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 transition-shadow hover:shadow-lg p-2"
                >
                  {cover ? (
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg">
                      <Image
                        src={cover}
                        alt={post.coverImage?.alt || post.title || "Blog cover"}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col px-2 py-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {post.publishedAt ? (
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      ) : null}
                    </div>
                    <h2 className="mt-2 text-lg font-extrabold leading-snug text-gray-900 group-hover:text-secondary">
                      {post.title}
                    </h2>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                      Read more
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
