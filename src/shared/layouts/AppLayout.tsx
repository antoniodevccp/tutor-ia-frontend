import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Outlet />
    </Box>
  )
}