import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../shared/layouts/AppLayout'
import LoginPage from '../features/auth/LoginPage'
import StartPage from '../features/catalog/StartPage'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
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