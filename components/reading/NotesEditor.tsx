'use client'

import TextEditor from '@/components/ui/editor/TextEditor'
import Button from '@/components/ui/button/Button'

type Props = {
  notes: string
  setNotes: (value: string) => void
  onSave?: () => void
  layout: 'stacked' | 'horizontal' | 'vertical'
}

export default function NotesEditor({
  notes,
  setNotes,
  onSave,
  layout,
}: Props) {
  const isVertical = layout === 'vertical'

  return (
    <div
      className={`w-full flex flex-col gap-4 ${
        isVertical ? 'sticky top-28 self-start' : ''
      }`}
    >
      <TextEditor value={notes} onChange={setNotes} />

      <div className="flex justify-center">
        <Button text="Guardar" type="button" onClick={onSave} />
      </div>
    </div>
  )
}
