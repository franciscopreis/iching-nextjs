'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import Button from '@/components/ui/button/Button'
import Swal from 'sweetalert2'
import { useReading } from '@/context/ReadingContext'

// Componente de botão para guardar a leitura
export default function SaveReadingButton({ onSave }: { onSave: () => void }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null) // estado do current user
  const router = useRouter() // hook do router
  const { saveToLocalStorageNow, clearReading } = useReading() // hook da leitura

  // Procura o user ao montar o componente
  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser()
      setUser(u)
    }
    fetchUser()
  }, [])

  // Função de clique no botão

  const handleClick = async () => {
    if (!user) {
      // Se não há user logado, salva a leitura no localStorage
      onSave()

      // Delay para garantir que o estado React atualizou
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Força a gravação no localStorage
      saveToLocalStorageNow()
      console.log(localStorage.getItem('guestReading'))
      // Pergunta ao user
      const res = await Swal.fire({
        title: 'A tua sessão não está iniciada',
        text: 'Para guardar a leitura precisas de criar conta ou fazer login.',
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Registo',
        denyButtonText: 'Login',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'green',
        denyButtonColor: 'blue',
        cancelButtonColor: 'orange',
      })

      if (res.isConfirmed) router.push('/registo')
      else if (res.isDenied) router.push('/login')
      else if (res.dismiss === Swal.DismissReason.cancel)
        window.location.reload()
      return
    }
    console.log('Usuário logado, salvando leitura e limpando localStorage...')
    onSave() // Atualiza o estado da leitura

    clearReading() // Limpa a leitura atual do contexto
    localStorage.getItem('guestReading')
  }

  return <Button text="Guardar" type="button" onClick={handleClick} />
}
