import { useQuery } from '@tanstack/react-query'
import { getAttempts } from '@/features/attempts/api/attemptService'
import type { PagedAttemptsResponse } from '@/features/attempts/types/attempt.types'

export const useAttempts = (pageNumber: number, pageSize: number) => {
  return useQuery<PagedAttemptsResponse>({
    queryKey: ['attempts', 'my', pageNumber, pageSize],
    queryFn: () => getAttempts({ pageNumber, pageSize }),
  })
}