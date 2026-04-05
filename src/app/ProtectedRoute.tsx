import { Navigate } from 'react-router-dom'
import { authStore } from '../features/auth/store/authStore'
import type { JSX } from 'react'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!authStore.token) {
    return <Navigate to="/login" replace />
  }

  return children
}