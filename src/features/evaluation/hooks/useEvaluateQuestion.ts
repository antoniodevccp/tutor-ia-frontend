import { useMutation } from '@tanstack/react-query'
import { evaluateQuestion } from '@/features/evaluation/api/evaluation'
import type { EvaluateQuestionRequest } from '@/features/evaluation/types/evaluation.types'

type Params = {
  questionId: string
  payload: EvaluateQuestionRequest
}

export const useEvaluateQuestion = () => {
  return useMutation({
    mutationFn: ({ questionId, payload }: Params) => evaluateQuestion(questionId, payload),
  })
}