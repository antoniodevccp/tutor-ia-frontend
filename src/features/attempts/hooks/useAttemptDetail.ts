import { useQuery } from '@tanstack/react-query'
import { getAttemptById } from '@/features/attempts/api/attemptService'

export const useAttemptDetail = (attemptId?: string) => {
  return useQuery({
    queryKey: ['attempts', attemptId],
    queryFn: () => getAttemptById(attemptId!),
    enabled: Boolean(attemptId),
  })
}