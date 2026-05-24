import { useQuery } from '@tanstack/react-query'
import { initialSync } from '@/features/sync/api/initialSync'

export const useInitialSync = () => {
  return useQuery({
    queryKey: ['initial-sync'],
    queryFn: initialSync,
    retry: 1,
  })
}