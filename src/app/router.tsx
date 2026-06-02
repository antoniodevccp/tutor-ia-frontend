import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '../shared/layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'

import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '@/features/auth/RegisterPage'

import SyncPage from '@/features/sync/pages/SyncPage'

import DashboardPage from '@/features/dashboard/pages/DashboardPage'

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
    path: '/sync',
    element: (
      <ProtectedRoute>
        <SyncPage />
      </ProtectedRoute>
    ),
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
      element: <DashboardPage />,
    },
  ],
  },
])