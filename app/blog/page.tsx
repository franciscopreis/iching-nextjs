import { cache } from 'react'
import BlogGrid from '@/components/blog/BlogGrid'
import { getAllPosts } from '@/lib/blog/posts'
import type { PostMeta } from '@/lib/blog/blogTypes'

// Função para obter todos os posts com seus metadados
const getCachedPosts = cache(async () => getAllPosts())

// Função principal do blog
export default async function BlogPage() {
  const posts: PostMeta[] = await getCachedPosts()
  return <BlogGrid initialPosts={posts} />
}
