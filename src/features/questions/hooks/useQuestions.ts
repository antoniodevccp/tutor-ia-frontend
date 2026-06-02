import { useQuery } from '@tanstack/react-query'
import { getQuestionsByTopic } from '@/features/questions/api/questions'

export const useQuestions = (topicId?: number) => {
  return useQuery({
    queryKey: ['questions', topicId],
    queryFn: () => getQuestionsByTopic(topicId!),
    enabled: Boolean(topicId),
  })
}