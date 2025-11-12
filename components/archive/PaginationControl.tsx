type PaginationControlProps = {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

// Paginação com botões para navegar entre páginas

export default function PaginationControl({
  page,
  totalPages,
  setPage,
}: PaginationControlProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="cursor-pointer px-3 py-1 rounded disabled:opacity-50 disabled:cursor-default border dark:hover:bg-amber-500 hover:bg-amber-500 disabled:hover:bg-transparent"
      >
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="cursor-pointer px-3 py-1 rounded   border disabled:cursor-default dark:hover:bg-amber-500 hover:bg-amber-500 disabled:hover:bg-transparent"
      >
        Seguinte
      </button>
    </div>
  )
}
