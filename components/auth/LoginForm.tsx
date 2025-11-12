'use client'

import { useActionState } from 'react'
import { loginUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthContext'
import { useAuthFeedbackPreset } from '@/hooks/useAuthFeedback'
import { SubmitButton } from '../ui/button/SubmitButton'
import AuthFormContainer from './AuthFormContainer'
import AuthFormField from './AuthFormField'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Formulário de Login
export default function LoginForm() {
  // Estado do formulário (controlado via Server Action)
  const [state, loginAction] = useActionState(loginUser, {
    errors: {},
    success: false,
  })

  // Atualização de autenticação global
  const { refreshAuth } = useAuth()
  // Navegação
  const router = useRouter()

  // Feedback genérico
  useAuthFeedbackPreset('login', state, refreshAuth, router)

  return (
    <main className="flex justify-center px-4 pt-16 flex-col">
      <AuthFormContainer title="O que fazes aí fora?">
        <form action={loginAction} className="space-y-4 w-full">
          <div className="flex mx-auto justify-center flex-col">
            <div className="relative w-full max-w-md aspect-6/5 overflow-hidden rounded-lg">
              <Image
                src="/images/used/group.svg"
                alt="Descrição da imagem"
                fill
                className="object-cover object-[10%_70%] transition duration-300 dark:invert"
                priority
              />
            </div>
            <p className="p-primary text-center text-base tracking-wide leading-relaxed">
              Não sabes quem somos? <br />
              Vai{' '}
              <Link href="/registo">
                <u>acolá</u>
              </Link>
              .
            </p>
          </div>

          {/* Campos do formulário */}
          <AuthFormField
            id="email"
            label="Email"
            required
            placeholder="user@email.com"
            errors={state.errors?.email ?? []}
          />
          <AuthFormField
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
      </AuthFormContainer>
    </main>
  )
}
