import { useQuery } from '@tanstack/react-query'
import { authStore } from '@/features/auth/store/authStore'
import { getMeRequest } from '@/features/auth/api/me'

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMeRequest,
    enabled: Boolean(authStore.token),
  })
}