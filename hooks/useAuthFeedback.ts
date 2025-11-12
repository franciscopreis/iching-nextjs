import { useEffect } from 'react'
import { toast } from 'react-toastify'
import type { AuthState, UseAuthFeedbackOptions } from '@/lib/auth/authTypes'

export type RouterType = {
  push: (url: string) => void
}

/**
 * Hook genérico para lidar com feedback de autenticação (login, registo, etc.)
 * - Mostra mensagens de sucesso/erro
 * - Atualiza o estado de autenticação
 * - Opcionalmente restaura leituras locais de utilizadores convidados
 * - Redireciona após sucesso
 */
export function useAuthFeedback(
  state: AuthState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType,
  options: UseAuthFeedbackOptions
) {
  const { successMessage, redirectUrl, restoreReading = false } = options

  useEffect(() => {
    if (!state) return

    const handle = async () => {
      console.log('Auth state:', state)

      // ✅ Caso sucesso (login/registo bem sucedido)
      if (state.success) {
        await refreshAuth?.() // Atualiza o AuthProvider

        // 🔄 Restaura leitura local de guest, se aplicável
        if (restoreReading) {
          const guestReading = localStorage.getItem('guestReading')
          if (guestReading) {
            try {
              const res = await fetch('/api/readings/restore-reading', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: guestReading,
              })
              const data = await res.json()
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

      // ⚠️ Caso erro — agrupa mensagens vindas do backend
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

/**
 * ⚙️ Novo hook genérico para feedback de autenticação
 * Substitui os anteriores `useLoginFeedback` e `useRegisterFeedback`
 *
 * Usa um tipo ('login' | 'register') para aplicar as mensagens e comportamento corretos
 */
export const useAuthFeedbackPreset = (
  type: 'login' | 'register',
  state: AuthState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) => {
  const presets = {
    login: {
      successMessage: 'Sessão iniciada com sucesso!',
      redirectUrl: '/dashboard',
      restoreReading: true,
    },
    register: {
      successMessage: 'Conta criada com sucesso! Bem-vindo(a)!',
      redirectUrl: '/dashboard',
      restoreReading: true,
    },
  } satisfies Record<string, UseAuthFeedbackOptions>

  return useAuthFeedback(state, refreshAuth, router, presets[type])
}
