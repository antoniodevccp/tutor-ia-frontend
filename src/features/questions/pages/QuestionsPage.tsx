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
  const topicName = data?.[0]?.topicName ?? 'Tema'

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
          No se pudieron cargar las preguntas.
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
          onClick={() => {
            if (gradeLevelId && subjectId) {
              navigate(`/topics?gradeLevelId=${gradeLevelId}&subjectId=${subjectId}`)
              return
            }

            navigate('/')
          }}
        >
          ← Volver a temas
        </Button>

        <Box mt={2} mb={4}>
          <Typography variant="h4" color="text.primary">
            Preguntas de {topicName}
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Selecciona una pregunta para responder y practicar.
          </Typography>
        </Box>

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
            }}
          >
            <Typography fontWeight={800} color="text.secondary">
              #
            </Typography>

            <Typography fontWeight={800} color="text.secondary">
              Pregunta
            </Typography>

            <Typography fontWeight={800} color="text.secondary" textAlign="center">
              Dificultad
            </Typography>

            <Typography fontWeight={800} color="text.secondary" textAlign="center">
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
                bgcolor: 'background.paper',
                borderColor: 'divider',
                transition: 'background-color 0.2s ease, transform 0.2s ease',

                '&:hover': {
                  bgcolor: 'background.default',
                  transform: { xs: 'none', md: 'translateY(-2px)' },
                },
              }}
            >
              <Typography fontWeight={800} color="primary.main">
                {index + 1}
              </Typography>

              <Box>
                <Typography fontWeight={800} color="text.primary">
                  {question.questionText}
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {question.gradeLevelName} · {question.subjectName}
                </Typography>

                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {!question.hasCurrentContext && (
                    <Chip size="small" color="warning" label="Sin contexto" />
                  )}

                  {question.contextNeedsRefresh && (
                    <Chip
                      size="small"
                      color="warning"
                      label="Contexto desactualizado"
                    />
                  )}
                </Stack>
              </Box>

              <Chip
                label={question.difficultyName}
                color={getDifficultyColor(question.difficultyName)}
                size="small"
                sx={{ fontWeight: 700 }}
              />

              <Button
                variant="contained"
                color="primary"
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