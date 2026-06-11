import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAttempts } from '@/features/attempts/hooks/useAttempts'
import { getAttemptId } from '@/features/attempts/util/getAttemptId'

const getScoreColor = (score: number) => {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'error'
}

export default function AttemptsPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data, isLoading, isError } = useAttempts(page, pageSize)

  const attempts = data?.items ?? []
  const totalPages = data?.totalPages ?? 1

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Typography color="error.main" fontWeight={700}>
          No se pudo cargar el historial.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: { xs: 0, md: 2 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          minHeight: { xs: '100vh', md: 'calc(100vh - 32px)' },
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, md: 4 },
          border: { xs: 'none', md: '1px solid' },
          borderColor: 'divider',
        }}
      >
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          ← Volver al inicio
        </Button>

        <Typography variant="h4" color="text.primary" mb={1}>
          Mis evaluaciones
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Revisa tus intentos anteriores y el feedback recibido.
        </Typography>

        <Stack spacing={2}>
          {attempts.map((attempt) => {
            const attemptId = getAttemptId(attempt)

            return (
              <Paper
                key={attemptId ?? `${attempt.topicName}-${attempt.createdAtUtc}`}
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr 120px 120px 120px',
                  },
                  gap: 2,
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderColor: 'divider',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',

                  '&:hover': {
                    bgcolor: 'background.default',
                    transform: { xs: 'none', md: 'translateY(-2px)' },
                  },
                }}
              >
                <Box>
                  <Typography fontWeight={800} color="text.primary">
                    {attempt.topicName ?? 'Evaluación'}
                  </Typography>

                  <Typography color="text.secondary">
                    {attempt.subjectName ?? 'Asignatura'} ·{' '}
                    {attempt.gradeLevelName ?? 'Nivel'}
                  </Typography>
                </Box>

                <Chip
                  label={attempt.grade}
                  color={getScoreColor(attempt.score)}
                  sx={{ fontWeight: 700 }}
                />

                <Typography fontWeight={800} color="text.primary">
                  {attempt.score}/100
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={!attemptId}
                  onClick={() => {
                    if (!attemptId) return
                    navigate(`/attempts/${attemptId}`)
                  }}
                >
                  Ver detalle
                </Button>
              </Paper>
            )
          })}
        </Stack>

        {attempts.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={6}>
            Aún no tienes evaluaciones registradas.
          </Typography>
        )}

        {totalPages > 1 && (
          <Stack alignItems="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        )}
      </Paper>
    </Box>
  )
}