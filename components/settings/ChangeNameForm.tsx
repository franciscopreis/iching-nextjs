'use client'

import { useActionState } from 'react'
import { changeNameAction } from '@/lib/settings/settingsActions'
import SettingsFormContainer from './SettingsFormContainer'
import SettingsField from './SettingsField'
import Button from '../ui/button/Button'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

// Form para mudar o nome
// Com useActionState
export default function ChangeNameForm() {
  const { refreshAuth } = useAuth()
  const [state, formAction, isPending] = useActionState(changeNameAction, {
    success: false,
    error: '',
  })

  useEffect(() => {
    if (state.success) {
      refreshAuth()
    }
  }, [state.success, refreshAuth])

  return (
    <form action={formAction}>
      <SettingsFormContainer
        title="Alterar Nome"
        error={state.error}
        success={state.success ? 'Nome atualizado!' : undefined}
      >
        <SettingsField
          name="newName"
          placeholder="Novo nome"
          required
          maxLength={15}
        />
        <SettingsField
          name="password"
          type="password"
          placeholder="Password atual"
          required
        />
        <p className="text-xs text-gray-500 mb-2">
          É necessário confirmar com a tua password atual.
        </p>
        <Button
          text={isPending ? 'A atualizar...' : 'Guardar'}
          disabled={isPending}
        />
      </SettingsFormContainer>
    </form>
  )
}
