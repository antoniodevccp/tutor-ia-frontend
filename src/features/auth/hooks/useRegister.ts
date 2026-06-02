import { useMutation } from '@tanstack/react-query'
import { registerRequest } from '@/features/auth/api/register'

export const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  })
}