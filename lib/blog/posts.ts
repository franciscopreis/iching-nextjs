import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import type { PostMeta } from './blogTypes'

// Diretório onde os posts do blog estão armazenados
const postsDir = path.join(process.cwd(), 'lib/blog/content')

// Função para ler o conteúdo de um post pelo seu slug
async function readPostFile(slug: string) {
  // Lê o arquivo MDX correspondente ao slug
  const filePath = path.join(postsDir, `${slug}.mdx`)
  // Lê o conteúdo do arquivo
  const fileContent = await fs.readFile(filePath, 'utf-8')
  // Usa gray-matter para separar os metadados do conteúdo
  const { data, content } = matter(fileContent)
  return { data, content }
}

// Função para obter todos os posts com seus metadados
export async function getAllPosts(): Promise<PostMeta[]> {
  // Lê todos os arquivos no diretório de posts
  const files = await fs.readdir(postsDir)

  // Mapeia cada arquivo para um objeto PostMeta
  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const { data } = await readPostFile(slug)
      return { ...data, slug } as PostMeta
    })
  )

  return posts
}

// Função para obter todos os slugs de posts
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  // Lê todos os arquivos no diretório de posts
  const files = await fs.readdir(postsDir)
  // Mapeia cada arquivo para um objeto com o slug
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ''),
  }))
}

// Função para obter um post específico pelo blog
export async function getPostBySlug(slug: string): Promise<{
  meta: PostMeta
  content: string
}> {
  // Lê o conteúdo do post pelo slug
  const { data, content } = await readPostFile(slug)
  return { meta: { ...data, slug } as PostMeta, content }
}
