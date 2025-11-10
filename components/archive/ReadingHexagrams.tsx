import HexagramCard from '@/components/hexagram/hexagramCard/HexagramCard'
import type { ReadingHexagramsProps } from '@/lib/readings/readingsTypes'

// Par de hexagramas da leitura
export default function ReadingHexagrams({
  originalHexagram,
  mutantHexagram,
}: ReadingHexagramsProps) {
  return (
    <>
      <HexagramCard title="Original" hexagram={originalHexagram} />
      <HexagramCard title="Mutante" hexagram={mutantHexagram} />
    </>
  )
}
