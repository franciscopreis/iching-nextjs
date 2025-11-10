import type { PostMeta } from './blogTypes'

// Função para ordenar posts com base no tipo e ordem de ordenação
export function sortPosts(
  a: PostMeta,
  b: PostMeta,
  sortType: 'date' | 'title' | 'category',
  sortOrder: 'asc' | 'desc'
) {
  if (sortType === 'date') {
    return sortOrder === 'desc'
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
  }
  const field = sortType === 'title' ? 'title' : 'category'
  return sortOrder === 'asc'
    ? a[field].localeCompare(b[field])
    : b[field].localeCompare(a[field])
}
