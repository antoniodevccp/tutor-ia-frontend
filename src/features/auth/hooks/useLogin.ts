import { useMutation } from '@tanstack/react-query'
import { loginRequest } from '@/features/auth/api/login'
import { authStore } from '@/features/auth/store/authStore'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: Parameters<typeof loginRequest>[0]) => {
      const data = await loginRequest(payload)

      const token = data.accessToken ?? data.token

      if (!token) {
        throw new Error('Login endpoint did not return an access token')
      }

      authStore.setToken(token)

      return data
    },
  })
}