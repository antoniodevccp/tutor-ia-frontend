import { http } from '@/shared/api/http'
import type { Question } from '@/features/questions/types/question.types'

export const getQuestionsByTopic = async (topicId: number) => {
  const { data } = await http.get<Question[]>('/Questions', {
    params: { topicId },
  })

  return data
}