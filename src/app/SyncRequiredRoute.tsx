import { Navigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

export default function SyncRequiredRoute({ children }: Props) {
  const queryClient = useQueryClient()
  const syncData = queryClient.getQueryData(['initial-sync'])

  if (!syncData) {
    return <Navigate to="/sync" replace />
  }

  return <>{children}</>
}