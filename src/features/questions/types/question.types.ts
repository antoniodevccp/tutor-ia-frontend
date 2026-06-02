export type Question = {
  id: string
  topicId: number
  topicName: string
  subjectId: number
  subjectName: string
  gradeLevelId: number
  gradeLevelName: string
  questionDifficultyId: number
  difficultyName: 'Bajo' | 'Medio' | 'Alto' | string
  questionText: string
  searchQuery: string
  isActive: boolean
  topicMaterialVersion: number
  currentContextVersionId: string
  currentContextVersionNumber: number
  contextMaterialVersionSnapshot: number
  lastContextGeneratedAtUtc: string | null
  hasCurrentContext: boolean
  contextNeedsRefresh: boolean
}