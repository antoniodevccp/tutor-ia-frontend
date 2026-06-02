import { http } from '@/shared/api/http'

export type RegisterClaimRequest = {
  type?: string | null
  value?: string | null
}

export type RegisterRequest = {
  userName: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  dayOfBirth: string
  roleName?: string | null
  claims?: RegisterClaimRequest[] | null
}

export type RegisterResponse = {
  message?: string | null
  user?: {
    id?: string | null
    userName?: string | null
    email?: string | null
  }
}

export const registerRequest = async (payload: RegisterRequest) => {
  const { data } = await http.post<RegisterResponse>('/Auth/register', payload)
  return data
}