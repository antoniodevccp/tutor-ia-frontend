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
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Paper sx={{ p: 4 }}>
          <Typography mb={2}>No hay resultado disponible.</Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al dashboard
          </Button>
        </Paper>
      </Box>
    )
  }

  const score = result.score
  const gradeColor = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          mb={3}
        >
          <Button
            variant="text"
            onClick={() => (topicId ? navigate(`/topics/${topicId}/questions`) : navigate('/'))}
          >
            ← Volver a preguntas
          </Button>

          <Chip label="Evaluación completada" color="success" />
        </Stack>

        <Typography variant="h4" mb={3}>
          Resultado de tu evaluación
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-around"
            alignItems="center"
            spacing={3}
          >
            <Box textAlign="center">
              <Typography variant="h5" color={`${gradeColor}.main`}>
                {result.grade}
              </Typography>
              <Typography color="text.secondary">Calificación</Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h5" color={`${gradeColor}.main`}>
                {score} / 100
              </Typography>
              <Typography color="text.secondary">Puntaje</Typography>
            </Box>

            <ScoreCircle score={score} />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight={800} mb={1}>
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
              bgcolor: 'rgba(59, 130, 246, 0.08)',
              borderColor: 'rgba(59, 130, 246, 0.25)',
            }}
          >
            <Typography fontWeight={800} color="primary.main" mb={1}>
              Sugerencia de mejora
            </Typography>
            <Typography color="text.secondary">{result.suggestedImprovement}</Typography>
          </Paper>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={2}>
            <Button variant="outlined" fullWidth onClick={() => navigate('/')}>
              Volver al dashboard
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={() =>
                topicId ? navigate(`/topics/${topicId}/questions`) : navigate('/')
              }
            >
              Resolver otra pregunta
            </Button>
          </Stack>
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
        bgcolor: `${color}.50`,
        borderColor: `${color}.main`,
      }}
    >
      <Typography fontWeight={800} color={`${color}.main`} mb={1}>
        {title}
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">{emptyText}</Typography>
      ) : (
        <Stack component="ul" sx={{ pl: 3, m: 0 }}>
          {items.map((item) => (
            <Typography component="li" key={item}>
              {item}
            </Typography>
          ))}
        </Stack>
      )}
    </Paper>
  )
}