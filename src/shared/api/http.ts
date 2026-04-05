import axios from 'axios'
import { authStore } from '../../features/auth/store/authStore'

export const http = axios.create({
  baseURL: 'http://localhost:5000/api',
})

http.interceptors.request.use((config) => {
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})