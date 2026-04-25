import { useQuery } from '@tanstack/react-query'
import { authStore } from '@/store/authStore'
import { getMeRequest } from '@/api/me'

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMeRequest,
    enabled: Boolean(authStore.token),
  })
}