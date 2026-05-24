export type GradeLevel = {
  id: string
  name: string
  code: string
}

export type Subject = {
  id: string
  name: string
}

export type Topic = {
  id: string
  name: string
  subjectId: string
  gradeLevelId: string
}

export type Question = {
  id: string
  topicId: string
  text: string
}