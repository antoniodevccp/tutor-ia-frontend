export type GradeLevel = {
  id: number
  name: string
  code?: string
}

export type Subject = {
  id: number
  name: string
  chromaDatabaseName?: string
}

export type Topic = {
  id: number
  name: string
  materialVersion: number
  contextNeedsRefresh: boolean
  lastMaterialUpdatedAtUtc: string | null
  subjectId: number
  subjectName: string
  gradeLevelId: number
  gradeLevelName: string
  chromaCollectionId: string
  chromaCollectionName: string
}

export type Question = {
  id: string
  topicId: string
  text: string
}