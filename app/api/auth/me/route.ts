import { getCurrentUserFromDB } from '@/lib/auth/authServices'
import { successResponse, errorResponse } from '@/lib/utils/responses'

// GET /api/auth/me
// Endpoint para obter os dados do utilizador autenticado
export async function GET() {
  try {
    // Obtém o utilizador atual a partir do banco de dados ou sessão
    const user = await getCurrentUserFromDB()

    if (!user) {
      return errorResponse('Não autenticado', 401)
    }

    return successResponse(user, 200)
  } catch (err) {
    console.error('[api/auth/me] Erro:', err)
    return errorResponse('Erro de servidor', 500)
  }
}
