import { http } from '../../../shared/api/http'

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
}

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await http.post<LoginResponse>('/auth/login', payload)
  return data
}