import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '../shared/layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '@/features/auth/RegisterPage'
import SyncPage from '@/features/sync/pages/SyncPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import TopicsPage from '@/features/topics/pages/TopicsPage'
import QuestionsPage from '@/features/questions/pages/QuestionsPage'
import AnswerQuestionPage from '@/features/evaluation/pages/AnswerQuestionPage'
import EvaluationResultPage from '@/features/evaluation/pages/EvaluationResultPage'
import SyncRequiredRoute from '@/app/SyncRequiredRoute'
import AttemptsPage from '@/features/attempts/pages/AttemptsPage'
import AttemptDetailPage from '@/features/attempts/pages/AttemptDetailPage'

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
      <SyncRequiredRoute>
        <AppLayout />
      </SyncRequiredRoute>
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
  ],
},
  {
  path: '/topics',
  element: (
    <ProtectedRoute>
      <TopicsPage />
    </ProtectedRoute>
  ),
},
{
  path: '/topics/:topicId/questions',
  element: (
    <ProtectedRoute>
      <QuestionsPage />
    </ProtectedRoute>
  ),
},
{
  path: '/questions/:questionId/answer',
  element: (
    <ProtectedRoute>
      <AnswerQuestionPage />
    </ProtectedRoute>
  ),
},
{
  path: '/evaluation-result',
  element: (
    <ProtectedRoute>
      <EvaluationResultPage />
    </ProtectedRoute>
  ),
},
{
  path: '/attempts',
  element: (
    <ProtectedRoute>
      <AttemptsPage />
    </ProtectedRoute>
  ),
},
{
  path: '/attempts/:attemptId',
  element: (
    <ProtectedRoute>
      <AttemptDetailPage />
    </ProtectedRoute>
  ),
},
]) 