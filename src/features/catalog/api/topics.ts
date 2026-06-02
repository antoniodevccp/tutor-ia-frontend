import { http } from '@/shared/api/http'
import type { Topic } from '@/features/catalog/types/syncTypes'

export const getTopics = async () => {
  const { data } = await http.get<Topic[]>('/Topics')
  return data
}