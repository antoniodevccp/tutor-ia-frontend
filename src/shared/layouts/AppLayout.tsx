import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <Box minHeight="100vh" bgcolor="#f7f9fc">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Tutor IA MVP
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}