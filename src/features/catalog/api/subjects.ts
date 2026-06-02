import { http } from '@/shared/api/http'
import type { Subject } from '@/features/catalog/types/syncTypes'

export const getSubjects = async () => {
  const { data } = await http.get<Subject[]>('/Subjects')
  return data
}