'use client'

import HexagramDetailsSymbol from './HexagramDetailsSymbol'
import HexagramDetails from './HexagramDetailsText'
import HexagramLines from './HexagramLines'
import type { HexagramCardProps } from '@/lib/hexagram/hexagramTypes'

// O componente que mostra o cartão completo de um hexagrama

// - Details (title, content) para Judgment e Image
// - Lines (linhas do hexagrama)

// Este componente é um módulo fundamental para exibir hexagramas
// É usado nas tabelas, novas leituras, arquivo e eventualmente também numa parte para estudo

export default function HexagramCard({ title, hexagram }: HexagramCardProps) {
  // Verifica se o hexagrama existe
  if (!hexagram) {
    return <p className="text-center italic text-gray-500">No data.</p>
  }

  const { number, name, unicode, details } = hexagram
  const { image = [], judgment = [], lines = [] } = details ?? {}

  return (
    <div className="mb-4 w-full">
      <HexagramDetailsSymbol number={number} unicode={unicode} name={name} />
      <HexagramDetails
        hexagramId={number}
        title="Judgment"
        content={judgment}
      />
      <HexagramDetails hexagramId={number} title="Image" content={image} />
      <HexagramLines lines={lines} />
    </div>
  )
}
