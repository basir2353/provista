import BlogContent from "@/components/pages/BlogContent";
import { api } from "@/lib/api";

export const metadata = {
  title: "Career Blog",
  description:
    "Expert advice on resume writing, job searching, LinkedIn strategy, and career growth — published weekly by our certified writers.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await api.blog.list().catch(() => []);
  return <BlogContent initialPosts={posts} />;
}
