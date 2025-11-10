'use client'

import { useState, useMemo } from 'react'
import { redirect } from 'next/navigation'
import BlogCard from './BlogCard'
import BlogFilters from './BlogFilters'
import type { PostMeta } from '@/lib/blog/blogTypes'
import { sortPosts } from '@/lib/blog/blogUtils'
import Image from 'next/image'

// Grid para mostrar entradas do blog com filtros e ordenação
export default function BlogGrid({
  initialPosts,
}: {
  initialPosts: PostMeta[]
}) {
  // Estados para tipo de ordenação, ordem e filtro de categoria
  const [sortType, setSortType] = useState<'date' | 'title' | 'category'>(
    'date'
  )
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Usa o useMemo (renderiza apenas quando initialPosts muda)

  // new Set para obter categorias únicas
  const categories = useMemo(() => {
    return Array.from(new Set(initialPosts.map((p) => p.category)))
  }, [initialPosts])

  const filteredPosts = useMemo(() => {
    let posts = initialPosts
    // Aplica filtro de categoria se não for 'all'
    if (categoryFilter !== 'all')
      posts = posts.filter(
        // lowercase para comparação case-insensitive
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      )

    // toSorted para ordenar posts com base no tipo e ordem selecionados (cria nova array)
    return posts.toSorted((a, b) => sortPosts(a, b, sortType, sortOrder))
  }, [initialPosts, sortType, sortOrder, categoryFilter])

  return (
    <>
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-10 ">
          <Image
            src="/images/new/pig.svg"
            alt="Ilustração de um tigre"
            fill
            className="object-contain w-full h-full max-w-100 p-0 transform transition-transform duration-300 hover:scale-105 dark:invert mx-auto"
          />

          <p>Nenhum post encontrado.</p>
        </div>
      ) : (
        <main className="p-6 max-w-6xl mx-auto items-center justify-center w-full">
          <BlogFilters
            sortType={sortType}
            sortOrder={sortOrder}
            categoryFilter={categoryFilter}
            categories={categories}
            onSortTypeChange={setSortType}
            onSortOrderChange={setSortOrder}
            onCategoryChange={setCategoryFilter}
            onBack={() => redirect('/')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </main>
      )}
    </>
  )
}
