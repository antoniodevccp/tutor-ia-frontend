import { http } from '@/shared/api/http'
import type {
  AttemptDetail,
  PagedAttemptsResponse,
} from '@/features/attempts/types/attempt.types'

type GetAttemptsParams = {
  pageNumber: number
  pageSize: number
  gradeLevelId?: number
  subjectId?: number
  topicId?: number
}

export const getAttempts = async (
  params: GetAttemptsParams,
): Promise<PagedAttemptsResponse> => {
  const { data } = await http.get<PagedAttemptsResponse>('/Attempts/my', {
    params,
  })

  return data
}

export const getRecentAttempts = async (): Promise<PagedAttemptsResponse> => {
  const { data } = await http.get<PagedAttemptsResponse>('/Attempts/my', {
    params: {
      pageNumber: 1,
      pageSize: 5,
    },
  })

  return data
}

export const getAttemptById = async (
  attemptId: string,
): Promise<AttemptDetail> => {
  const { data } = await http.get<AttemptDetail>(`/Attempts/${attemptId}`)
  return data
}