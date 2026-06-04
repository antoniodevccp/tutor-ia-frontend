import { useQuery } from '@tanstack/react-query'
import { getRecentAttempts } from '@/features/attempts/api/attemptService'
import type { PagedAttemptsResponse } from '@/features/attempts/types/attempt.types'

export const useRecentAttempts = () => {
  return useQuery<PagedAttemptsResponse>({
    queryKey: ['attempts', 'recent'],
    queryFn: getRecentAttempts,
  })
}