import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuestions } from '@/features/questions/hooks/useQuestions'

export default function QuestionsPage() {
  const navigate = useNavigate()
  const { topicId } = useParams()

  const parsedTopicId = Number(topicId)

  const { data, isLoading, isError } = useQuestions(parsedTopicId)

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
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" mb={1}>
          Preguntas disponibles
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Selecciona una pregunta para responder.
        </Typography>

        <Stack spacing={2}>
          {data?.map((question, index) => (
            <Paper key={question.id} variant="outlined" sx={{ p: 2 }}>
              <Typography fontWeight={700} mb={1}>
                Pregunta {index + 1}
              </Typography>

              <Typography color="text.secondary" mb={2}>
                {question.text ?? question.questionText}
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate(`/questions/${question.id}/answer`)}
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