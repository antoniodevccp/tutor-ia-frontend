import { http } from '@/shared/api/http'

export type LoginRequest = {
  email: string
  password: string

}

export type LoginResponse = {
  accessToken?: string
  token?: string
  expiresInSeconds?: number
  user?: {
    id?: string
    email?: string
    roles?: string[]
  }
}


export const loginRequest = async (payload: LoginRequest) => {
  const { data } = await http.post<LoginResponse>('/Auth/login', payload)
  return data
}