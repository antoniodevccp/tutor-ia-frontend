import { Avatar, Box, Stack, Typography } from '@mui/material'

type Props = {
  userName: string
  subjectName?: string
}

export default function DashboardHeader({ userName, subjectName }: Props) {
  const initials = userName.slice(0, 2).toUpperCase()

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      spacing={2}
      mb={3}
    >
      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography color="text.secondary">{subjectName ?? 'Asignatura'}</Typography>
      </Box>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{ bgcolor: 'primary.main' }}>{initials}</Avatar>
        <Box>
          <Typography fontWeight={700}>{userName}</Typography>
          <Typography variant="body2" color="text.secondary">
            Estudiante
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}