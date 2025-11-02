import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  title: string
  date: string
  image: string
  excerpt: string
  category: string
  slug: string
}

const postsDir = path.join(process.cwd(), 'content/blog')

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(postsDir)

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDir, filename)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        title: data.title,
        date: data.date,
        image: data.image,
        excerpt: data.excerpt,
        category: data.category,
        slug: filename.replace(/\.mdx?$/, ''),
      }
    })
  )

  return posts
}

export async function getAllPostSlugs() {
  const files = await fs.readdir(postsDir)
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ''),
  }))
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    meta: {
      title: data.title,
      date: data.date,
      image: data.image,
      excerpt: data.excerpt,
      category: data.category,
      slug,
    } as PostMeta,
    content,
  }
}
