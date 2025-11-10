import type { HexagramObject } from '@/lib/hexagram/hexagramTypes'
import type { Line } from '@/lib/hexagram/hexagramTypes'
// === Reading DB Rows ===
export type ReadingRow = {
  id: number
  user_id: number
  question: string
  notes?: string | null
  createdAt?: string
  originalBinary: string
  mutantBinary: string
  hexagramRaw: string
}

export type Reading = {
  originalHexagram: HexagramObject
  mutantHexagram: HexagramObject
  hexagramRaw: string
  lines?: Line[]
}

// === Reading used in frontend with Hexagrams ===
export type ReadingView = ReadingRow & {
  originalHexagram: HexagramObject
  mutantHexagram: HexagramObject
  hexagramRaw: string
  lines?: Line[]
}

// === Input para criar uma leitura ===
export type ReadingInput = {
  user_id: number
  question: string
  notes?: string | null
  originalBinary: string
  mutantBinary: string
  hexagramRaw: string
}

// Props para componentes
export type ReadingItemProps = {
  reading: ReadingView
  onDelete: (id: number) => void
  isOpen: boolean
  onToggle: () => void
}

// Erro genérico
export type ErrorResponse = {
  error: string
}

export type ReadingListProps = {
  readings: ReadingView[]
  openId: number | null
  setOpenId: (id: number | null) => void
  onDelete: (id: number) => void
}

export type ReadingHexagramsProps = {
  originalHexagram: any
  mutantHexagram: any
}

export type ReadingHeaderProps = {
  question: string
  date: string
  originalHexagram: string
  mutantHexagram: string
  hexagramRaw: string
  isOpen: boolean
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}

export type ReadingNotesProps = {
  notes: string
  setNotes: (notes: string) => void
  isEditing: boolean
  layout: 'stacked' | 'horizontal' | 'vertical'
  onSave: () => void
  maxLength?: number
}

export type ReadingInputProps = {
  question: string
  setQuestion: (q: string) => void
  onGenerate: () => Promise<void>
  isGenerating: boolean
  error?: string
  maxLength?: number
}

export type ReadingLogsProps = {
  lines?: Line[]
  hexagramRaw?: string
  title?: string
}

export type ReadingViewProps = {
  reading: ReadingView
  layout: 'stacked' | 'horizontal' | 'vertical'
  isEditing?: boolean
  notes: string
  setNotes: (v: string) => void
  onSaveNotes: () => void
  showLogs?: boolean
  editable?: boolean
}

export type ReadingType = {
  question: string
  lines?: Line[] // as linhas da leitura (6 ou menos)
  hexagrams?: {
    match1: HexagramObject
    match2: HexagramObject
    hexagramRaw: string // fallback para logs
  }
  originalHexagram?: HexagramObject
  mutantHexagram?: HexagramObject
}
