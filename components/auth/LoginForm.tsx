'use client'

import { useActionState, useEffect } from 'react'
import { loginUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthProvider'
import type { LoginState } from '@/lib/auth/authTypes'
import { SubmitButton } from '../ui/button/SubmitButton'
import FormContainer from './FormContainer'
import FormField from './FormField'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [state, loginAction] = useActionState<LoginState, FormData>(loginUser, {
    errors: {},
    success: false,
  })
  const { refreshAuth } = useAuth()
  const router = useRouter()

  // 🔄 useEffect para lidar com sucesso do login
  useEffect(() => {
    if (state.success) {
      console.log('✅ Login bem-sucedido - iniciando processo...')

      const processSuccess = async () => {
        try {
          await refreshAuth()
          await new Promise((resolve) => setTimeout(resolve, 200))

          const savedReading = localStorage.getItem('guestReading')
          if (savedReading) {
            try {
              const readingData = JSON.parse(savedReading)
              await fetch('/api/readings/restore-reading', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(readingData),
              })
              localStorage.removeItem('guestReading')
            } catch (err) {
              console.error('Erro ao restaurar leitura', err)
            }
          }

          router.push('/dashboard')
        } catch (error) {
          console.error('❌ Erro no processo de login:', error)
        }
      }

      processSuccess()
    }
  }, [state.success, refreshAuth, router])

  return (
    <main className="flex justify-center px-4 pt-16 flex-col">
      <FormContainer title="O que fazes aí fora?">
        <form action={loginAction} className="space-y-4 w-full">
          <div className="flex mx-auto justify-center flex-col">
            <div className="relative w-full max-w-md aspect-6/5 overflow-hidden rounded-lg">
              <Image
                src="/images/svg/group.svg"
                alt="Descrição da imagem"
                fill
                className="object-cover object-[10%_70%] transition duration-300 dark:invert"
                priority
              />
            </div>
            <p className="p-primary text-center text-base tracking-wide leading-relaxed">
              Não sabes quem somos? <br></br>Vai{' '}
              <Link href="/registo">
                <u>acolá</u>
              </Link>
              .
            </p>
          </div>
          <FormField
            id="email"
            label="Email"
            required
            placeholder="user@email.com"
            errors={state.errors?.email ?? []}
          />
          <FormField
            id="password"
            label="Palavra-passe"
            type="password"
            required
            placeholder="Mínimo 6 caracteres"
            errors={state.errors?.password ?? []}
          />
          <div className="pt-4">
            <SubmitButton title="Entrar" />
          </div>
        </form>
      </FormContainer>
    </main>
  )
}
