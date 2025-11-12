import type {
  HexagramObject,
  BinaryMatchHexagramRawOutput,
  Line,
} from '@/lib/hexagram/hexagramTypes'

export type LayoutMode = 'stacked' | 'horizontal' | 'vertical'

// --- Tipos base de leitura ---
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

export type ReadingView = ReadingRow & {
  originalHexagram: HexagramObject
  mutantHexagram: HexagramObject
  hexagramRaw: string
  lines?: Line[]
}

export type ReadingInput = {
  user_id: number
  question: string
  notes?: string | null
  originalBinary: string
  mutantBinary: string
  hexagramRaw: string
}

// --- Props de componentes ---
export type ReadingItemProps = {
  reading: ReadingView
  onDelete: (id: number) => void
  isOpen: boolean
  onToggle: () => void
}

export type ReadingListProps = {
  readings: ReadingView[]
  openId: number | null
  setOpenId: (id: number | null) => void
  onDelete: (id: number) => void
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
  layout: LayoutMode
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
  layout: LayoutMode
  isEditing?: boolean
  notes: string
  setNotes: (v: string) => void
  onSaveNotes: () => void
  showLogs?: boolean
  editable?: boolean
}

// --- Tipos auxiliares ---
export type HexagramsType = {
  match1: HexagramObject
  match2: HexagramObject
  hexagramRaw: string
}

export type LineType = Line

export type ReadingSessionProps = {
  reading?: ReadingView
  hexagrams?: HexagramsType
  lines?: LineType[] | null
  notes: string
  setNotes: (value: string) => void
  onSave?: () => void
  layout?: LayoutMode
  isEditing?: boolean
  showInput?: boolean
  showModeSelector?: boolean
}

// --- Contexto ---
export type ReadingContextType = {
  question: string
  setQuestion: (question: string) => void
  notes: string
  setNotes: (notes: string) => void
  lines: Line[] | null
  setLines: (lines: Line[] | null) => void
  hexagrams: BinaryMatchHexagramRawOutput | null
  setHexagrams: (hexagrams: BinaryMatchHexagramRawOutput | null) => void
  clearReading: () => void
  saveToLocalStorageNow: () => void
}
