import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvaluateQuestion } from '@/features/evaluation/hooks/useEvaluateQuestion'

export default function AnswerQuestionPage() {
  const navigate = useNavigate()
  const { questionId } = useParams()
  const [studentAnswer, setStudentAnswer] = useState('')

  const evaluateMutation = useEvaluateQuestion()

  const onSubmit = async () => {
    if (!questionId || !studentAnswer.trim()) return

    const result = await evaluateMutation.mutateAsync({
      questionId,
      payload: { studentAnswer },
    })

    navigate('/evaluation-result', {
      state: result,
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" mb={1}>
          Responder pregunta
        </Typography>

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