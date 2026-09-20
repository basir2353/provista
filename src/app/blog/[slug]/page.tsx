import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/pages/BlogPostContent";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await api.blog.get(slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await api.blog.get(slug);
  } catch {
    notFound();
  }

  if (!post || post.published === false) {
    notFound();
  }

  const related = await api.blog
    .list()
    .then((posts) => posts.filter((p) => p.slug !== post.slug).slice(0, 5))
    .catch(() => []);

  return <BlogPostContent post={post} related={related} />;
}
