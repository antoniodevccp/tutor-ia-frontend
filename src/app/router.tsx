import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../shared/layouts/AppLayout'
import LoginPage from '../features/auth/LoginPage'
import StartPage from '../features/catalog/StartPage'
import ProtectedRoute from './ProtectedRoute'
import RegisterPage from '@/features/auth/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
  path: '/register',
  element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StartPage />,
      },
    ],
  },
])