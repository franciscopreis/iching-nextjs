import BlogGrid from '@/components/blog/BlogGrid'
import { getAllPosts, type PostMeta } from '@/lib/blog/posts'

export default async function BlogPage() {
  const posts: PostMeta[] = await getAllPosts()
  return <BlogGrid initialPosts={posts} />
}
