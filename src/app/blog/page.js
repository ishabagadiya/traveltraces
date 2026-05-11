import BlogListContent from "@/components/blog/BlogListContent";
import { client } from "@/sanity/lib/client";

export const metadata = {
  metadataBase: new URL("https://www.traveltraces.in/blog"),
  title: "Blog | TravelTraces",
  description:
    "Travel stories, destination guides, and tips from the TravelTraces team.",
};

export default async function BlogPage() {
  const posts = await client.fetch(
    `*[_type == "blogs" && defined(slug.current)] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      readTime,
      coverImage
    }`
  );

  return <BlogListContent posts={posts} />;
}
