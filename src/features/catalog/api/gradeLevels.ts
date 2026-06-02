import { http } from '@/shared/api/http'
import type { GradeLevel } from '@/features/catalog/types/syncTypes'

export const getGradeLevels = async () => {
  const { data } = await http.get<GradeLevel[]>('/GradeLevels')
  return data
}