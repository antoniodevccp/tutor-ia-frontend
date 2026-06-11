import { Box, Button, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAttemptDetail } from '@/features/attempts/hooks/useAttemptDetail'

const getScoreColor = (score: number) => {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'error'
}

export default function AttemptDetailPage() {
  const navigate = useNavigate()
  const { attemptId } = useParams()
  const { data, isLoading, isError } = useAttemptDetail(attemptId)

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

  if (isError || !data) {
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
          No se pudo cargar el detalle.
        </Typography>
      </Box>
    )
  }

  const scoreColor = getScoreColor(data.score)

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
          maxWidth: 900,
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
          onClick={() => navigate('/attempts')}
          sx={{ mb: 3 }}
        >
          ← Volver a mis evaluaciones
        </Button>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          mb={3}
        >
          <Box>
            <Typography variant="h4" color="text.primary">
              Detalle del intento
            </Typography>

            <Typography color="text.secondary" mt={0.5}>
              {data.topicName}
            </Typography>
          </Box>

          <Chip
            label={data.grade}
            color={scoreColor}
            sx={{ fontWeight: 800 }}
          />
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mb: 3,
            bgcolor: `${scoreColor}.light`,
            borderColor: `${scoreColor}.main`,
          }}
        >
          <Typography variant="h3" color={`${scoreColor}.main`} fontWeight={800}>
            {data.score}/100
          </Typography>

          <Typography color="text.secondary">
            Puntaje obtenido
          </Typography>
        </Paper>

        <Stack spacing={2}>
          {data.questionText && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderColor: 'divider',
              }}
            >
              <Typography fontWeight={800} color="primary.main" mb={1}>
                Pregunta
              </Typography>

              <Typography color="text.primary">
                {data.questionText}
              </Typography>
            </Paper>
          )}

          {data.studentAnswer && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderColor: 'divider',
              }}
            >
              <Typography fontWeight={800} color="secondary.main" mb={1}>
                Tu respuesta
              </Typography>

              <Typography color="text.primary">
                {data.studentAnswer}
              </Typography>
            </Paper>
          )}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: 'info.light',
              borderColor: 'info.main',
            }}
          >
            <Typography fontWeight={800} color="info.main" mb={1}>
              Feedback
            </Typography>

            <Typography color="text.secondary">
              {data.feedback ?? 'Sin feedback disponible.'}
            </Typography>
          </Paper>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 3 }}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Box>
  )
}