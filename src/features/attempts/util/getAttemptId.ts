import type { AttemptSummary } from '@/features/attempts/types/attempt.types'

export const getAttemptId = (attempt: AttemptSummary) => {
  return attempt.id ?? attempt.attemptId ?? attempt.questionAttemptId
}