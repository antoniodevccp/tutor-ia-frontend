export type EvaluateQuestionRequest = {
  studentAnswer: string
}

export type EvaluationResponse = {
  questionAttemptId: string
  questionId: string
  questionContextVersionId: string
  grade: string
  score: number
  feedback: string
  strengths: string[]
  weaknesses: string[]
  missingConcepts: string[]
  suggestedImprovement: string
  confidence: number
  usedContextChunks: number[]
}