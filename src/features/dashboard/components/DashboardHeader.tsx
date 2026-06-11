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
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ fontWeight: 800 }}
        >
          Mi Aprendizaje
        </Typography>

        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: 700,
          }}
        >
          {subjectName ?? 'Asignatura'}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 52,
            height: 52,
            fontWeight: 800,
            boxShadow: (theme) =>
              `0 4px 12px ${theme.palette.primary.main}40`,
          }}
        >
          {initials}
        </Avatar>

        <Box>
          <Typography
            fontWeight={800}
            color="text.primary"
          >
            {userName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Estudiante
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}