'use client'

import ArchiveReadingItem from './ArchiveReadingItem'
import type { ReadingListProps } from '@/lib/readings/readingsTypes'
import { useRef, useEffect } from 'react'

/**
 * Lista de leituras do arquivo:
 * - Recebe o ArchiveReadingItem
 */

export default function ArchiveReadingList({
  readings,
  openId,
  setOpenId,
  onDelete,
}: ReadingListProps) {
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    if (openId == null) return
    const el = itemRefs.current[openId]
    if (!el) return

    const headerOffset = 80
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }, [openId])

  return (
    <>
      {readings.map((reading) => {
        if (reading.id == null) return null
        return (
          <ArchiveReadingItem
            key={reading.id}
            ref={(el) => {
              itemRefs.current[reading.id] = el
            }}
            reading={reading}
            isOpen={reading.id === openId}
            onToggle={() =>
              setOpenId(openId === reading.id ? null : reading.id)
            }
            onDelete={(id) => {
              onDelete(id)
              if (openId === id) setOpenId(null)
            }}
          />
        )
      })}
    </>
  )
}
