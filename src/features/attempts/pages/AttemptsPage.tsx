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
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">No se pudo cargar el historial.</Typography>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>
          ← Volver al dashboard
        </Button>

        <Typography variant="h4" mb={1}>
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
                  gridTemplateColumns: { xs: '1fr', md: '1fr 120px 120px 120px' },
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography fontWeight={800}>
                    {attempt.topicName ?? 'Evaluación'}
                  </Typography>

                  <Typography color="text.secondary">
                    {attempt.subjectName ?? 'Asignatura'} · {attempt.gradeLevelName ?? 'Nivel'}
                  </Typography>
                </Box>

                <Chip
                  label={attempt.grade}
                  color={getScoreColor(attempt.score)}
                />

                <Typography fontWeight={800}>{attempt.score}/100</Typography>

                <Button
                  variant="contained"
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