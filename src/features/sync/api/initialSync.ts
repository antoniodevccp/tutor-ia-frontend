import { getMeRequest } from '@/features/auth/api/me'
import { getGradeLevels } from '@/features/catalog/api/gradeLevels'
import { getSubjects } from '@/features/catalog/api/subjects'
import { getTopics } from '@/features/catalog/api/topics'

export const initialSync = async () => {
  const [me, gradeLevels, subjects, topics] = await Promise.all([
    getMeRequest(),
    getGradeLevels(),
    getSubjects(),
    getTopics(),
  ])

  return {
    me,
    gradeLevels,
    subjects,
    topics,
  }
}