export type AttemptSummary = {
  id?: string
  attemptId?: string
  questionAttemptId?: string
  topicId?: number
  topicName?: string
  subjectName?: string
  gradeLevelName?: string
  grade: string
  score: number
  feedback?: string
  createdAt?: string
  createdAtUtc?: string
}

export type AttemptDetail = AttemptSummary & {
  questionId?: string
  questionText?: string
  studentAnswer?: string
  strengths?: string[]
  weaknesses?: string[]
  missingConcepts?: string[]
  suggestedImprovement?: string
}
export type PagedAttemptsResponse = {
  items: AttemptSummary[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type AttemptsResponse = AttemptSummary[]