import { useEffect } from 'react'
import { toast } from 'react-toastify'
import type { LoginState, RegisterState } from '@/lib/auth/authTypes'

type AuthState = LoginState | RegisterState

interface RouterType {
  push: (url: string) => void
}

export function useAuthFeedback(
  state: AuthState | null | undefined,
  successMessage: string,
  redirectUrl: string,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) {
  useEffect(() => {
    if (!state) return

    const handle = async () => {
      if (state.success) {
        await refreshAuth?.()
        setTimeout(() => {
          toast.success(successMessage)
          router.push(redirectUrl)
        }, 50)
        return
      }

      // Extrair erros de forma type-safe
      const errorMessages: string[] = []

      // Verificar erros de email
      if (state.errors.email) {
        errorMessages.push(...state.errors.email)
      }

      // Verificar erros de password
      if (state.errors.password) {
        errorMessages.push(...state.errors.password)
      }

      // Verificar erros de name (apenas se existir no state)
      if ('name' in state.errors && state.errors.name) {
        errorMessages.push(...state.errors.name)
      }

      if (errorMessages.length) {
        toast.error(errorMessages.join(' • '))
      }
    }

    handle()
  }, [state, refreshAuth, router, successMessage, redirectUrl])
}

// Aliases permanecem iguais
export const useLoginFeedback = (
  state: LoginState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) =>
  useAuthFeedback(
    state,
    'Sessão iniciada com sucesso!',
    '/dashboard',
    refreshAuth,
    router
  )

export const useRegisterFeedback = (
  state: RegisterState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) =>
  useAuthFeedback(
    state,
    'Conta criada com sucesso! Bem-vindo(a)!',
    '/dashboard',
    refreshAuth,
    router
  )
