import { http } from '@/shared/api/http'
import type {
  EvaluateQuestionRequest,
  EvaluationResponse,
} from '@/features/evaluation/types/evaluation.types'

export const evaluateQuestion = async (
  questionId: string,
  payload: EvaluateQuestionRequest,
) => {
  const { data } = await http.post<EvaluationResponse>(
    `/questions/${questionId}/evaluate`,
    payload,
  )

  return data
}