import { useMutation } from '@tanstack/react-query'
import { loginRequest } from '../api/login'
import { authStore } from '../store/authStore'

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      authStore.setToken(data.token)
    },
  })
}