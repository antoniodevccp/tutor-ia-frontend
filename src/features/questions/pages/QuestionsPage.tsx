import {

  Box,

  Button,

  Chip,

  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'

import { useQuestions } from '@/features/questions/hooks/useQuestions'

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'bajo':
      return 'success'
    case 'medio':
      return 'warning'
    case 'alto':
      return 'error'
    default:
      return 'default'
  }
}

export default function QuestionsPage() {
  const navigate = useNavigate()
  const { topicId } = useParams()
  const parsedTopicId = Number(topicId)

  const { data, isLoading, isError } = useQuestions(parsedTopicId)
  const gradeLevelId = data?.[0]?.gradeLevelId
  const subjectId = data?.[0]?.subjectId
  const topicName = data?.[0]?.topicName ?? 'Tópico'

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">No se pudieron cargar las preguntas.</Typography>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Button
          variant="text"
          onClick={() => {
            if (gradeLevelId && subjectId) {
              navigate(`/topics?gradeLevelId=${gradeLevelId}&subjectId=${subjectId}`)
              return
            }

            navigate('/')
          }}>
          ← Volver a Topics
        </Button>

        <Typography variant="h4" mt={2} mb={1}>
          Preguntas - {topicName}
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Selecciona una pregunta para responder.
        </Typography>

        <Stack spacing={2}>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: '48px 1fr 120px 140px',
            gap: 2,
            alignItems: 'center',
            bgcolor: 'background.default',
            borderColor: 'divider',
          }}>
          <Typography fontWeight={700} color="text.secondary">
            #
          </Typography>
          <Typography fontWeight={700} color="text.secondary">
            Pregunta
          </Typography>
          <Typography fontWeight={700} color="text.secondary" textAlign="center">
            Dificultad
          </Typography>
          <Typography fontWeight={700} color="text.secondary" textAlign="center">
            Acción
          </Typography>
        </Paper>

          {data?.map((question, index) => (
            <Paper
              key={question.id}
              variant="outlined"
              sx={{
                p: 2,
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '48px 1fr 120px 140px',
                },
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Typography fontWeight={700}>{index + 1}</Typography>

              <Box>
                <Typography fontWeight={700}>{question.questionText}</Typography>

                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {question.gradeLevelName} · {question.subjectName}
                </Typography>

                {!question.hasCurrentContext && (
                  <Chip size="small" color="warning" label="Sin contexto" sx={{ mt: 1 }} />
                )}

                {question.contextNeedsRefresh && (
                  <Chip size="small" color="warning" label="Contexto desactualizado" sx={{ mt: 1 }} />
                )}
              </Box>

              <Chip
                label={question.difficultyName}
                color={getDifficultyColor(question.difficultyName)}
                size="small"
              />

              <Button
                variant="contained"
                onClick={() =>
                  navigate(`/questions/${question.id}/answer`, {
                    state: {
                      topicId: question.topicId,
                      topicName: question.topicName,
                      questionText: question.questionText,
                    },
                  })
                }
              >
                Responder
              </Button>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  )
}