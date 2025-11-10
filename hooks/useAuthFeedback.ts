import { useEffect } from 'react'
import { toast } from 'react-toastify'
import type { LoginState, RegisterState } from '@/lib/auth/authTypes'
import { useReading } from '@/context/ReadingContext'

type AuthState = LoginState | RegisterState

interface RouterType {
  push: (url: string) => void
}

interface UseAuthFeedbackOptions {
  successMessage: string
  redirectUrl: string
  restoreReading?: boolean
}

export function useAuthFeedback(
  state: AuthState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType,
  options: UseAuthFeedbackOptions
) {
  const { successMessage, redirectUrl, restoreReading = false } = options
  const { saveToLocalStorageNow } = useReading()

  useEffect(() => {
    if (!state) return

    const handle = async () => {
      console.log('Auth state:', state)
      if (state.success) {
        await refreshAuth?.()
        if (restoreReading) {
          const guestReading = localStorage.getItem('guestReading')
          if (guestReading) {
            console.log('Restoring guest reading:', guestReading)
            try {
              const res = await fetch('/api/readings/restore-reading', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: guestReading,
              })
              const data = await res.json()
              console.log('Restore reading response:', data)
              if (data.success) localStorage.removeItem('guestReading')
            } catch (err) {
              console.error('Falha ao restaurar leitura', err)
            }
          }
        }
        toast.success(successMessage)
        router.push(redirectUrl)
        return
      }

      const errorMessages: string[] = []
      if (state.errors.email) errorMessages.push(...state.errors.email)
      if (state.errors.password) errorMessages.push(...state.errors.password)
      if ('name' in state.errors && state.errors.name)
        errorMessages.push(...state.errors.name)
      if (errorMessages.length) toast.error(errorMessages.join(' • '))
    }

    handle()
  }, [state, refreshAuth, router, successMessage, redirectUrl, restoreReading])
}

export const useLoginFeedback = (
  state: LoginState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) =>
  useAuthFeedback(state, refreshAuth, router, {
    successMessage: 'Sessão iniciada com sucesso!',
    redirectUrl: '/dashboard',
    restoreReading: true,
  })

export const useRegisterFeedback = (
  state: RegisterState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) =>
  useAuthFeedback(state, refreshAuth, router, {
    successMessage: 'Conta criada com sucesso! Bem-vindo(a)!',
    redirectUrl: '/dashboard',
    restoreReading: true,
  })
