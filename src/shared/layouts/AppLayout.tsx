import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppMenuButton from '@/shared/ui/navigation/AppMenuButton'

export default function AppLayout() {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <AppMenuButton />
      <Outlet />
    </Box>
  )
}