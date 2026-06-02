import { useQuery } from '@tanstack/react-query'
import { http } from '@/shared/api/http'
import type { Topic } from '@/features/catalog/types/syncTypes'

type Params = {
  gradeLevelId?: number
  subjectId?: number
}

const getTopics = async ({ gradeLevelId, subjectId }: Params) => {
  const { data } = await http.get<Topic[]>('/Topics', {
    params: {
      gradeLevelId,
      subjectId,
    },
  })

  return data
}

export const useTopics = (params: Params) => {
  return useQuery({
    queryKey: ['topics', params],
    queryFn: () => getTopics(params),
    enabled: Boolean(params.gradeLevelId && params.subjectId),
  })
}