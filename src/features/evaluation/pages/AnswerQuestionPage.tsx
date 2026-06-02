import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEvaluateQuestion } from '@/features/evaluation/hooks/useEvaluateQuestion'

type AnswerPageState = {
  topicId?: number
  topicName?: string
  questionText?: string
}

export default function AnswerQuestionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { questionId } = useParams()

  const [studentAnswer, setStudentAnswer] = useState('')
  const evaluateMutation = useEvaluateQuestion()

  const state = location.state as AnswerPageState | null

  const onSubmit = async () => {
    if (!questionId || !studentAnswer.trim()) return

    const result = await evaluateMutation.mutateAsync({
      questionId,
      payload: { studentAnswer },
    })

    navigate('/evaluation-result', {
      state: {
        result,
        topicId: state?.topicId,
      },
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" mb={1}>
          Responder pregunta
        </Typography>

        {state?.topicName && (
          <Typography color="text.secondary" mb={1}>
            Topic: {state.topicName}
          </Typography>
        )}

        {state?.questionText && (
          <Typography fontWeight={700} mb={3}>
            {state.questionText}
          </Typography>
        )}

        <Typography color="text.secondary" mb={3}>
          Escribe tu respuesta con el mayor detalle posible.
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Tu respuesta"
            value={studentAnswer}
            onChange={(event) => setStudentAnswer(event.target.value)}
            multiline
            minRows={8}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={evaluateMutation.isPending || !studentAnswer.trim()}
          >
            {evaluateMutation.isPending ? 'Evaluando...' : 'Enviar respuesta'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}