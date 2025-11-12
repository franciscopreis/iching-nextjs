// Tipo que representa o usuário atual ou null
export type CurrentUser = {
  id: number
  email: string
  name: string
  emailVerified: boolean
} | null

// Tipo usado na sessão ou payload de autenticação
export type SessionPayload = {
  userId: number
  email: string
  name?: string
  emailVerified?: boolean
}

// Tipo de usuário completo no banco
export type User = {
  id: number
  email: string
  name: string
  password?: string
  createdAt: Date | string // não usado ainda
  emailVerified?: boolean
}

// Tipo de usuário seguro, exposto ao front-end
export type SafeUser = {
  id: number
  email: string
  name: string
  emailVerified?: boolean
}

// Estado base de autenticação
type BaseAuthState = {
  success: boolean
  userId?: number
  name?: string
}

// Estado de login
export type LoginState = BaseAuthState & {
  errors: { email?: string[]; password?: string[] }
}

// Estado de registro
export type RegisterState = BaseAuthState & {
  errors: { name?: string[]; email?: string[]; password?: string[] }
}

// Contexto de autenticação
export type AuthContextType = {
  isAuthenticated: boolean
  user: SafeUser | CurrentUser // integrando CurrentUser
  loading: boolean
  refreshAuth: () => void | Promise<void>
}

// Estado geral de autenticação
export type AuthState = LoginState | RegisterState

// Opções para feedback da autenticação
export type UseAuthFeedbackOptions = {
  successMessage: string
  redirectUrl: string
  restoreReading?: boolean
}
