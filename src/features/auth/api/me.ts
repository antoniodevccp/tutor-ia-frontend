import { http } from '@/shared/api/http'

export type MeClaimResponse = {
  type?: string | null
  value?: string | null
}

export type MeResponse = {
  id?: string | null
  userName?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  dateOfBirth?: string | null
  claims?: MeClaimResponse[] | null
}

export const getMeRequest = async () => {
  const { data } = await http.get<MeResponse>('/Auth/me')
  return data
}