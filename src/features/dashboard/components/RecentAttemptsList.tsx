import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecentAttempts } from '@/features/attempts/hooks/useRecentAttempts'
import { getAttemptId } from '@/features/attempts/util/getAttemptId'

const getScoreColor = (score: number) => {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'error'
}

export default function RecentAttemptsList() {
    
  const navigate = useNavigate()
  const { data, isLoading, isError } = useRecentAttempts()
  const attempts = data?.items ?? []
  return (
    <Box mt={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5">Últimos intentos</Typography>
          <Typography color="text.secondary">
            Revisa tus evaluaciones más recientes.
          </Typography>
        </Box>

        <Button variant="text" onClick={() => navigate('/attempts')}>
          Ver todos
        </Button>
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderColor: 'divider',
        }}
      >
        {isLoading && (
          <Stack alignItems="center" py={4}>
            <CircularProgress />
          </Stack>
        )}

        {isError && (
          <Typography color="error" p={3}>
            No se pudieron cargar los últimos intentos.
          </Typography>
        )}

        {!isLoading && !isError && attempts?.length === 0 && (
          <Typography color="text.secondary" p={3}>
            Aún no tienes intentos registrados.
          </Typography>
        )}

        {!isLoading &&
            !isError &&
            attempts.map((attempt) => {
              const attemptId = getAttemptId(attempt)

              return (
                <Box
                    key={attemptId ?? `${attempt.topicName}-${attempt.createdAtUtc}`}
                    sx={{
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: '1fr 120px 120px 120px',
                    },
                    gap: 2,
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    }}
                >
                    <Box>
                    <Typography fontWeight={800}>
                        {attempt.topicName ?? 'Evaluación'}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {attempt.subjectName ?? 'Asignatura'} ·{' '}
                        {attempt.gradeLevelName ?? 'Nivel'}
                    </Typography>
                    </Box>

                    <Chip
                    label={attempt.grade}
                    color={getScoreColor(attempt.score)}
                    size="small"
                    />

                    <Typography fontWeight={800}>{attempt.score}/100</Typography>

                    <Button
                    variant="outlined"
                    disabled={!attemptId}
                    onClick={() => {
                        if (!attemptId) return
                        navigate(`/attempts/${attemptId}`)
                    }}
                    >
                    Detalle
                    </Button>
                </Box>
                )
            })}
      </Paper>
    </Box>
  )
}