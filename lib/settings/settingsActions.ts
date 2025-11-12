'use server'

import { SettingsChangeType } from '@/lib/settings/types'
import { getCurrentUser, setSession } from '@/lib/auth/session'
import {
  changeEmailService,
  changePasswordService,
  deleteAccountService,
  sendContactMessageService,
  changeNameService,
} from '@/lib/settings/settingsServices'

// Action para mudar email
export async function changeEmailAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autenticado' }

  const newEmail = formData.get('newEmail') as string
  const password = formData.get('password') as string

  try {
    await changeEmailService(user.id, newEmail, password)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar email' }
  }
}
// Action para mudar password
export async function changePasswordAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autenticado' }

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword)
    return { success: false, error: 'As passwords não coincidem' }

  try {
    await changePasswordService(user.id, currentPassword, newPassword)
    return { success: true }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Erro ao atualizar password',
    }
  }
}
// Action para enviar mensagem
export async function sendContactMessageAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user?.email)
    return { success: false, error: 'Utilizador não autenticado' }

  const subject = formData.get('subject') as string
  const message = formData.get('message') as string
  const topic = formData.get('topic') as string
  const sequence = formData.get('sequence') as string | undefined

  if (!subject || !message)
    return { success: false, error: 'Preencha todos os campos' }

  try {
    await sendContactMessageService(
      user.id,
      user.email,
      subject,
      message,
      topic
    )
    return { success: true }
  } catch (err: any) {
    console.error('Erro no service:', err)
    return { success: false, error: err.message || 'Erro ao enviar mensagem' }
  }
}

/**
 * Action para alterar nome

 */
export async function changeNameAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autenticado' }

  const newName = formData.get('newName') as string
  const password = formData.get('password') as string

  if (!newName) return { success: false, error: 'Nome é obrigatório' }

  try {
    // Atualiza o nome na base de dados
    await changeNameService(user.id, newName, password)

    // JWT com o novo nome
    const { encrypt, setSession } = await import('@/lib/auth/session')
    const token = await encrypt({
      userId: user.id,
      email: user.email,
      name: newName,
    })
    await setSession(token)

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar nome' }
  }
}
