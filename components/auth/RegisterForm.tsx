'use client'

import { useActionState } from 'react'
import { registerUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthContext'
import { useAuthFeedbackPreset } from '@/hooks/useAuthFeedback'
import { SubmitButton } from '../ui/button/SubmitButton'
import AuthFormContainer from './AuthFormContainer'
import AuthFormField from './AuthFormField'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Formulário de Registo
export default function RegisterForm() {
  // Estado do formulário (controlado via Server Action)
  const [state, registerAction] = useActionState(registerUser, {
    errors: {},
    success: false,
  })

  // Atualização de autenticação global
  const { refreshAuth } = useAuth()
  // Navegação
  const router = useRouter()

  // Feedback genérico (antes: useRegisterFeedback)
  useAuthFeedbackPreset('register', state, refreshAuth, router)

  return (
    <main className="flex justify-center px-4 pt-16">
      <AuthFormContainer title="Junta-te a nós">
        <div className="flex mx-auto justify-center flex-col">
          <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg">
            <Image
              src="/images/used/women.svg"
              alt="Descrição da imagem"
              fill
              className="object-cover object-[10%_70%] transition duration-300 dark:invert"
              priority
            />
          </div>
          <p className="p-primary text-center text-base tracking-wide leading-relaxed">
            Já nos conhecemos? <br />
            Vai até{' '}
            <Link href="/login">
              <u>ali</u>
            </Link>
            .
          </p>
        </div>

        <form action={registerAction} className="space-y-4 w-full">
          {/* Campos do formulário */}
          <AuthFormField
            id="name"
            name="name"
            label="Nome"
            required
            maxLength={20}
            placeholder="Como serás chamado?"
            errors={state.errors?.name ?? []}
          />
          <AuthFormField
            id="email"
            name="email"
            label="Email"
            required
            placeholder="user@email.com"
            errors={state.errors?.email ?? []}
          />
          <AuthFormField
            id="password"
            name="password"
            label="Palavra-passe"
            type="password"
            required
            placeholder="Mínimo 6 caracteres"
            errors={state.errors?.password ?? []}
          />
          <div className="pt-4">
            <SubmitButton title="Registar" />
          </div>
        </form>
      </AuthFormContainer>
    </main>
  )
}
