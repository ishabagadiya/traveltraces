import { notFound } from "next/navigation";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { client } from "@/sanity/lib/client";

const postQuery = `*[_type == "blogs" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  readTime,
  coverImage,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    },
    _type == "blogReference" => {
      ...,
      post->{
        _id,
        title,
        slug
      }
    }
  }
}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return { title: "Post not found | TravelTraces" };
  }

  return {
    title: `${post.title} | TravelTraces`,
    description: "Tips from the TravelTraces team",
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await client.fetch(postQuery, { slug });

  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
