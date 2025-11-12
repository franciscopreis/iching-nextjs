export type HexagramRow = {
  number: number
  name_en: string
  unicode_hexagram: string
  summary: string
  binary: string
  image: string
  judgment: string
  line_1: string
  line_2: string
  line_3: string
  line_4: string
  line_5: string
  line_6: string
}

export type HexagramDetails = {
  judgment: string[]
  image: string[]
  lines: string[][]
}

export type HexagramObject = {
  number: number
  name: string
  binary: string
  unicode: string
  info: string
  details?: HexagramDetails
}

export type LayoutMode = 'stacked' | 'horizontal' | 'vertical'

export type HexagramComponentProps = {
  hexagrams: { match1: HexagramObject; match2: HexagramObject }
  layout: LayoutMode
  notes: string
  setNotes: (value: string) => void
  onSave: () => void
}

export type HexagramCardProps = {
  title: string
  hexagram: HexagramObject | null
}

export type HexagramDetailsProps = {
  hexagramId: number
  title: string
  content: string[] | string[][]
}

export type HexagramCellProps = {
  number: number
  symbol: string
  englishName: string
  isSelected: boolean
  isHovered: boolean
  onClick: (number: number, symbol: string, englishName: string) => void
  onMouseEnter: (number: number, symbol: string, englishName: string) => void
  onMouseLeave: () => void
}

export type HexagramTableProps = {
  hexagramNumbers: number[][]
  hexagramSymbols: string[][]
  hexagramNames: string[][]
  selectedHexagram: HexagramObject | null
  hoveredHexagram: HexagramObject | null
  onClick: (partial: { number: number }) => void
  onHover: (partial: { number: number }) => void
  onHoverLeave: () => void
}

export type ResponsiveHexagramLayoutProps = {
  table: React.ReactNode
  selectedHexagram: HexagramObject | null
  trigrams?: string[]
}

export type BinaryMatchInput = {
  binary1: string
  binary2: string
}

export type BinaryMatchHexagramRawOutput = {
  match1: HexagramObject
  match2: HexagramObject
  hexagramRaw: string
}

export type Line = {
  tosses: number[]
  sum: number
  symbol: string
}

export type HexagramLineItemProps = {
  idx: number
  texts: string[]
  isOpen: boolean
  toggle: () => void
}

export type HexagramDetailsSymbolProps = {
  number: number
  unicode: string
  title?: string
  name?: string
}

export type HexagramLinesProps = {
  lines: string[][]
}
