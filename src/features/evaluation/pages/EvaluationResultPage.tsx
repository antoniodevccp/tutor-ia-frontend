import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import ScoreCircle from '@/features/evaluation/components/ScoreCircle'
import type { EvaluationResponse } from '@/features/evaluation/types/evaluation.types'

export default function EvaluationResultPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as {
    result: EvaluationResponse
    topicId?: number
  } | null

  const result = state?.result
  const topicId = state?.topicId

  if (!result) {
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
        <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Typography color="text.primary" mb={2}>
            No hay resultado disponible.
          </Typography>

          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Paper>
      </Box>
    )
  }

  const score = result.score
  const gradeColor = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'

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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          mb={3}
        >
          <Button
            variant="text"
            color="primary"
            onClick={() => (topicId ? navigate(`/topics/${topicId}/questions`) : navigate('/'))}
          >
            ← Volver a preguntas
          </Button>

          <Chip label="Evaluación completada" color="success" sx={{ fontWeight: 700 }} />
        </Stack>

        <Typography variant="h4" color="text.primary" mb={3}>
          Resultado de tu evaluación
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mb: 3,
            bgcolor: 'background.paper',
            borderColor: 'divider',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-around"
            alignItems="center"
            spacing={3}
          >
            <Box textAlign="center">
              <Typography variant="h5" color={`${gradeColor}.main`} fontWeight={800}>
                {result.grade}
              </Typography>
              <Typography color="text.secondary">Calificación</Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h5" color={`${gradeColor}.main`} fontWeight={800}>
                {score} / 100
              </Typography>
              <Typography color="text.secondary">Puntaje</Typography>
            </Box>

            <ScoreCircle score={score} />
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mb: 3,
            bgcolor: 'background.default',
            borderColor: 'divider',
          }}
        >
          <Typography fontWeight={800} color="text.primary" mb={1}>
            Feedback
          </Typography>

          <Typography color="text.secondary">{result.feedback}</Typography>
        </Paper>

        <Stack spacing={2}>
          <FeedbackBlock
            title="Fortalezas"
            color="success"
            items={result.strengths}
            emptyText="No se detectaron fortalezas específicas."
          />

          <FeedbackBlock
            title="Aspectos a mejorar"
            color="warning"
            items={result.weaknesses}
            emptyText="No se detectaron aspectos críticos a mejorar."
          />

          <FeedbackBlock
            title="Conceptos faltantes"
            color="error"
            items={result.missingConcepts}
            emptyText="No hay conceptos faltantes."
          />

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: 'info.light',
              borderColor: 'info.main',
            }}
          >
            <Typography fontWeight={800} color="info.main" mb={1}>
              Sugerencia de mejora
            </Typography>

            <Typography color="text.secondary">{result.suggestedImprovement}</Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              mt: 3,
              p: 3,
              bgcolor: 'background.paper',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" color="text.primary" mb={1}>
              ¿Qué deseas hacer ahora?
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Continúa practicando o revisa tu progreso.
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                onClick={() =>
                  topicId ? navigate(`/topics/${topicId}/questions`) : navigate('/')
                }
              >
                Resolver otra pregunta
              </Button>

              <Button
                size="large"
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                onClick={() => navigate('/attempts')}
              >
                Ver mis evaluaciones
              </Button>

              <Button
                size="large"
                variant="text"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                onClick={() => navigate('/')}
              >
                Inicio
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Box>
  )
}

type FeedbackBlockProps = {
  title: string
  color: 'success' | 'warning' | 'error'
  items: string[]
  emptyText: string
}

function FeedbackBlock({ title, color, items, emptyText }: FeedbackBlockProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: `${color}.light`,
        borderColor: `${color}.main`,
      }}
    >
      <Typography fontWeight={800} color={`${color}.main`} mb={1}>
        {title}
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">{emptyText}</Typography>
      ) : (
        <Stack component="ul" sx={{ pl: 3, m: 0 }} spacing={0.5}>
          {items.map((item) => (
            <Typography component="li" key={item} color="text.primary">
              {item}
            </Typography>
          ))}
        </Stack>
      )}
    </Paper>
  )
}