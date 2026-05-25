import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { useQueryClient } from '@tanstack/react-query'

type InitialSyncData = {
  me: {
    userName?: string | null
    email?: string | null
  }
  gradeLevels: {
    id: number
    name: string
  }[]
  subjects: {
    id: number
    name: string
  }[]
  topics: {
    id: number
    name: string
    subjectName: string
    gradeLevelName: string
    materialVersion: number
    contextNeedsRefresh: boolean
  }[]
}

export default function DashboardPage() {
  const theme = useTheme()
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData<InitialSyncData>(['initial-sync'])

  const userName = data?.me.userName || data?.me.email || 'Usuario'
  const initials = userName.slice(0, 2).toUpperCase()

  const selectedGrade = data?.gradeLevels[0]
  const selectedSubject = data?.subjects.find((s) => s.name === 'History') ?? data?.subjects[0]
  const topics = data?.topics ?? []

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#070D1A' : '#F4F7FB',
        color: 'text.primary',
        p: { xs: 0, md: 2 },
      }}
    >
      <Paper
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          minHeight: { xs: '100vh', md: 'calc(100vh - 32px)' },
          p: { xs: 2, md: 3 },
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'background.paper',
          borderRadius: { xs: 0, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          mb={3}
        >
          <Box>
            <Typography variant="h4">Dashboard</Typography>
            <Typography color="text.secondary">
              {selectedSubject?.name ?? 'Asignatura'}
            </Typography>
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

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 3,
            color: 'white',
            background: 'linear-gradient(135deg, #5B36F2 0%, #A020F0 50%, #3B82F6 100%)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 4,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(255,255,255,0.16)',
              }}
            >
              <SchoolOutlinedIcon fontSize="large" />
            </Box>

            <Box>
              <Typography variant="h4">¡Bienvenido, {userName}!</Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Continúa aprendiendo con TutorIA.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
          <TextField select label="Nivel" value={selectedGrade?.id ?? ''} fullWidth>
            {data?.gradeLevels.map((level) => (
              <MenuItem key={level.id} value={level.id}>
                {level.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField select label="Asignatura" value={selectedSubject?.id ?? ''} fullWidth>
            {data?.subjects.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Typography variant="h5" mb={2}>
          Topics disponibles
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {topics.map((topic) => (
            <Paper
              key={topic.id}
              sx={{
                overflow: 'hidden',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  height: 120,
                  background:
                    'linear-gradient(135deg, rgba(59,130,246,0.45), rgba(124,58,237,0.45))',
                }}
              />

              <Box p={2}>
                <Stack direction="row" justifyContent="space-between" gap={1} mb={1}>
                  <Typography variant="h6" textTransform="capitalize">
                    {topic.name}
                  </Typography>

                  {topic.contextNeedsRefresh && (
                    <Chip size="small" color="warning" label="Actualizar" />
                  )}
                </Stack>

                <Typography color="text.secondary" mb={2}>
                  {topic.gradeLevelName} · {topic.subjectName}
                </Typography>

                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Material v{topic.materialVersion}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={topic.contextNeedsRefresh ? 45 : 100}
                    sx={{ flex: 1, height: 6, borderRadius: 999 }}
                  />
                </Stack>

                <Button fullWidth variant="contained">
                  Comenzar
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}